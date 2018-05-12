package me.airdrops.abcdeapp.web.rest;

import me.airdrops.abcdeapp.AbcdeApp;

import me.airdrops.abcdeapp.domain.EmailProvider;
import me.airdrops.abcdeapp.repository.EmailProviderRepository;
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
import java.util.List;

import static me.airdrops.abcdeapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EmailProviderResource REST controller.
 *
 * @see EmailProviderResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AbcdeApp.class)
public class EmailProviderResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CONNECTED = "AAAAAAAAAA";
    private static final String UPDATED_CONNECTED = "BBBBBBBBBB";

    private static final String DEFAULT_API_KEY = "AAAAAAAAAA";
    private static final String UPDATED_API_KEY = "BBBBBBBBBB";

    @Autowired
    private EmailProviderRepository emailProviderRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmailProviderMockMvc;

    private EmailProvider emailProvider;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmailProviderResource emailProviderResource = new EmailProviderResource(emailProviderRepository);
        this.restEmailProviderMockMvc = MockMvcBuilders.standaloneSetup(emailProviderResource)
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
    public static EmailProvider createEntity(EntityManager em) {
        EmailProvider emailProvider = new EmailProvider()
            .name(DEFAULT_NAME)
            .connected(DEFAULT_CONNECTED)
            .apiKey(DEFAULT_API_KEY);
        return emailProvider;
    }

    @Before
    public void initTest() {
        emailProvider = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmailProvider() throws Exception {
        int databaseSizeBeforeCreate = emailProviderRepository.findAll().size();

        // Create the EmailProvider
        restEmailProviderMockMvc.perform(post("/api/email-providers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emailProvider)))
            .andExpect(status().isCreated());

        // Validate the EmailProvider in the database
        List<EmailProvider> emailProviderList = emailProviderRepository.findAll();
        assertThat(emailProviderList).hasSize(databaseSizeBeforeCreate + 1);
        EmailProvider testEmailProvider = emailProviderList.get(emailProviderList.size() - 1);
        assertThat(testEmailProvider.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testEmailProvider.getConnected()).isEqualTo(DEFAULT_CONNECTED);
        assertThat(testEmailProvider.getApiKey()).isEqualTo(DEFAULT_API_KEY);
    }

    @Test
    @Transactional
    public void createEmailProviderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emailProviderRepository.findAll().size();

        // Create the EmailProvider with an existing ID
        emailProvider.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmailProviderMockMvc.perform(post("/api/email-providers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emailProvider)))
            .andExpect(status().isBadRequest());

        // Validate the EmailProvider in the database
        List<EmailProvider> emailProviderList = emailProviderRepository.findAll();
        assertThat(emailProviderList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEmailProviders() throws Exception {
        // Initialize the database
        emailProviderRepository.saveAndFlush(emailProvider);

        // Get all the emailProviderList
        restEmailProviderMockMvc.perform(get("/api/email-providers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emailProvider.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].connected").value(hasItem(DEFAULT_CONNECTED.toString())))
            .andExpect(jsonPath("$.[*].apiKey").value(hasItem(DEFAULT_API_KEY.toString())));
    }

    @Test
    @Transactional
    public void getEmailProvider() throws Exception {
        // Initialize the database
        emailProviderRepository.saveAndFlush(emailProvider);

        // Get the emailProvider
        restEmailProviderMockMvc.perform(get("/api/email-providers/{id}", emailProvider.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emailProvider.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.connected").value(DEFAULT_CONNECTED.toString()))
            .andExpect(jsonPath("$.apiKey").value(DEFAULT_API_KEY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmailProvider() throws Exception {
        // Get the emailProvider
        restEmailProviderMockMvc.perform(get("/api/email-providers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmailProvider() throws Exception {
        // Initialize the database
        emailProviderRepository.saveAndFlush(emailProvider);
        int databaseSizeBeforeUpdate = emailProviderRepository.findAll().size();

        // Update the emailProvider
        EmailProvider updatedEmailProvider = emailProviderRepository.findOne(emailProvider.getId());
        // Disconnect from session so that the updates on updatedEmailProvider are not directly saved in db
        em.detach(updatedEmailProvider);
        updatedEmailProvider
            .name(UPDATED_NAME)
            .connected(UPDATED_CONNECTED)
            .apiKey(UPDATED_API_KEY);

        restEmailProviderMockMvc.perform(put("/api/email-providers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmailProvider)))
            .andExpect(status().isOk());

        // Validate the EmailProvider in the database
        List<EmailProvider> emailProviderList = emailProviderRepository.findAll();
        assertThat(emailProviderList).hasSize(databaseSizeBeforeUpdate);
        EmailProvider testEmailProvider = emailProviderList.get(emailProviderList.size() - 1);
        assertThat(testEmailProvider.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testEmailProvider.getConnected()).isEqualTo(UPDATED_CONNECTED);
        assertThat(testEmailProvider.getApiKey()).isEqualTo(UPDATED_API_KEY);
    }

    @Test
    @Transactional
    public void updateNonExistingEmailProvider() throws Exception {
        int databaseSizeBeforeUpdate = emailProviderRepository.findAll().size();

        // Create the EmailProvider

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmailProviderMockMvc.perform(put("/api/email-providers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emailProvider)))
            .andExpect(status().isCreated());

        // Validate the EmailProvider in the database
        List<EmailProvider> emailProviderList = emailProviderRepository.findAll();
        assertThat(emailProviderList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmailProvider() throws Exception {
        // Initialize the database
        emailProviderRepository.saveAndFlush(emailProvider);
        int databaseSizeBeforeDelete = emailProviderRepository.findAll().size();

        // Get the emailProvider
        restEmailProviderMockMvc.perform(delete("/api/email-providers/{id}", emailProvider.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EmailProvider> emailProviderList = emailProviderRepository.findAll();
        assertThat(emailProviderList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmailProvider.class);
        EmailProvider emailProvider1 = new EmailProvider();
        emailProvider1.setId(1L);
        EmailProvider emailProvider2 = new EmailProvider();
        emailProvider2.setId(emailProvider1.getId());
        assertThat(emailProvider1).isEqualTo(emailProvider2);
        emailProvider2.setId(2L);
        assertThat(emailProvider1).isNotEqualTo(emailProvider2);
        emailProvider1.setId(null);
        assertThat(emailProvider1).isNotEqualTo(emailProvider2);
    }
}
