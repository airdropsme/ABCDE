package me.airdrops.abcdeapp.web.rest;

import me.airdrops.abcdeapp.AbcdeApp;

import me.airdrops.abcdeapp.domain.RegisteredUser;
import me.airdrops.abcdeapp.repository.RegisteredUserRepository;
import me.airdrops.abcdeapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static me.airdrops.abcdeapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RegisteredUserResource REST controller.
 *
 * @see RegisteredUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AbcdeApp.class)
public class RegisteredUserResourceIntTest {

    private static final LocalDate DEFAULT_JOIN_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_JOIN_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_ACCOUNT_PLAN = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_PLAN = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_EMAIL_VERIFIED = false;
    private static final Boolean UPDATED_EMAIL_VERIFIED = true;

    @Autowired
    private RegisteredUserRepository registeredUserRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRegisteredUserMockMvc;

    private RegisteredUser registeredUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RegisteredUserResource registeredUserResource = new RegisteredUserResource(registeredUserRepository);
        this.restRegisteredUserMockMvc = MockMvcBuilders.standaloneSetup(registeredUserResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RegisteredUser createEntity(EntityManager em) {
        RegisteredUser registeredUser = new RegisteredUser()
            .joinDate(DEFAULT_JOIN_DATE)
            .accountPlan(DEFAULT_ACCOUNT_PLAN)
            .email(DEFAULT_EMAIL)
            .emailVerified(DEFAULT_EMAIL_VERIFIED);
        return registeredUser;
    }

    @Before
    public void initTest() {
        registeredUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createRegisteredUser() throws Exception {
        int databaseSizeBeforeCreate = registeredUserRepository.findAll().size();

        // Create the RegisteredUser
        restRegisteredUserMockMvc.perform(post("/api/registered-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(registeredUser)))
            .andExpect(status().isCreated());

        // Validate the RegisteredUser in the database
        List<RegisteredUser> registeredUserList = registeredUserRepository.findAll();
        assertThat(registeredUserList).hasSize(databaseSizeBeforeCreate + 1);
        RegisteredUser testRegisteredUser = registeredUserList.get(registeredUserList.size() - 1);
        assertThat(testRegisteredUser.getJoinDate()).isEqualTo(DEFAULT_JOIN_DATE);
        assertThat(testRegisteredUser.getAccountPlan()).isEqualTo(DEFAULT_ACCOUNT_PLAN);
        assertThat(testRegisteredUser.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testRegisteredUser.isEmailVerified()).isEqualTo(DEFAULT_EMAIL_VERIFIED);
    }

    @Test
    @Transactional
    public void createRegisteredUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = registeredUserRepository.findAll().size();

        // Create the RegisteredUser with an existing ID
        registeredUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRegisteredUserMockMvc.perform(post("/api/registered-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(registeredUser)))
            .andExpect(status().isBadRequest());

        // Validate the RegisteredUser in the database
        List<RegisteredUser> registeredUserList = registeredUserRepository.findAll();
        assertThat(registeredUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRegisteredUsers() throws Exception {
        // Initialize the database
        registeredUserRepository.saveAndFlush(registeredUser);

        // Get all the registeredUserList
        restRegisteredUserMockMvc.perform(get("/api/registered-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(registeredUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].joinDate").value(hasItem(DEFAULT_JOIN_DATE.toString())))
            .andExpect(jsonPath("$.[*].accountPlan").value(hasItem(DEFAULT_ACCOUNT_PLAN.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].emailVerified").value(hasItem(DEFAULT_EMAIL_VERIFIED.booleanValue())));
    }

    @Test
    @Transactional
    public void getRegisteredUser() throws Exception {
        // Initialize the database
        registeredUserRepository.saveAndFlush(registeredUser);

        // Get the registeredUser
        restRegisteredUserMockMvc.perform(get("/api/registered-users/{id}", registeredUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(registeredUser.getId().intValue()))
            .andExpect(jsonPath("$.joinDate").value(DEFAULT_JOIN_DATE.toString()))
            .andExpect(jsonPath("$.accountPlan").value(DEFAULT_ACCOUNT_PLAN.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.emailVerified").value(DEFAULT_EMAIL_VERIFIED.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRegisteredUser() throws Exception {
        // Get the registeredUser
        restRegisteredUserMockMvc.perform(get("/api/registered-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRegisteredUser() throws Exception {
        // Initialize the database
        registeredUserRepository.saveAndFlush(registeredUser);
        int databaseSizeBeforeUpdate = registeredUserRepository.findAll().size();

        // Update the registeredUser
        RegisteredUser updatedRegisteredUser = registeredUserRepository.findOne(registeredUser.getId());
        // Disconnect from session so that the updates on updatedRegisteredUser are not directly saved in db
        em.detach(updatedRegisteredUser);
        updatedRegisteredUser
            .joinDate(UPDATED_JOIN_DATE)
            .accountPlan(UPDATED_ACCOUNT_PLAN)
            .email(UPDATED_EMAIL)
            .emailVerified(UPDATED_EMAIL_VERIFIED);

        restRegisteredUserMockMvc.perform(put("/api/registered-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRegisteredUser)))
            .andExpect(status().isOk());

        // Validate the RegisteredUser in the database
        List<RegisteredUser> registeredUserList = registeredUserRepository.findAll();
        assertThat(registeredUserList).hasSize(databaseSizeBeforeUpdate);
        RegisteredUser testRegisteredUser = registeredUserList.get(registeredUserList.size() - 1);
        assertThat(testRegisteredUser.getJoinDate()).isEqualTo(UPDATED_JOIN_DATE);
        assertThat(testRegisteredUser.getAccountPlan()).isEqualTo(UPDATED_ACCOUNT_PLAN);
        assertThat(testRegisteredUser.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testRegisteredUser.isEmailVerified()).isEqualTo(UPDATED_EMAIL_VERIFIED);
    }

    @Test
    @Transactional
    public void updateNonExistingRegisteredUser() throws Exception {
        int databaseSizeBeforeUpdate = registeredUserRepository.findAll().size();

        // Create the RegisteredUser

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRegisteredUserMockMvc.perform(put("/api/registered-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(registeredUser)))
            .andExpect(status().isCreated());

        // Validate the RegisteredUser in the database
        List<RegisteredUser> registeredUserList = registeredUserRepository.findAll();
        assertThat(registeredUserList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRegisteredUser() throws Exception {
        // Initialize the database
        registeredUserRepository.saveAndFlush(registeredUser);
        int databaseSizeBeforeDelete = registeredUserRepository.findAll().size();

        // Get the registeredUser
        restRegisteredUserMockMvc.perform(delete("/api/registered-users/{id}", registeredUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<RegisteredUser> registeredUserList = registeredUserRepository.findAll();
        assertThat(registeredUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RegisteredUser.class);
        RegisteredUser registeredUser1 = new RegisteredUser();
        registeredUser1.setId(1L);
        RegisteredUser registeredUser2 = new RegisteredUser();
        registeredUser2.setId(registeredUser1.getId());
        assertThat(registeredUser1).isEqualTo(registeredUser2);
        registeredUser2.setId(2L);
        assertThat(registeredUser1).isNotEqualTo(registeredUser2);
        registeredUser1.setId(null);
        assertThat(registeredUser1).isNotEqualTo(registeredUser2);
    }
}
