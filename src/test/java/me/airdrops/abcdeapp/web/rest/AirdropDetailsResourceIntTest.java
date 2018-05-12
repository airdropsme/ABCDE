package me.airdrops.abcdeapp.web.rest;

import me.airdrops.abcdeapp.AbcdeApp;

import me.airdrops.abcdeapp.domain.AirdropDetails;
import me.airdrops.abcdeapp.repository.AirdropDetailsRepository;
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
 * Test class for the AirdropDetailsResource REST controller.
 *
 * @see AirdropDetailsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AbcdeApp.class)
public class AirdropDetailsResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CURRENCY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CURRENCY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CURRENCY_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_CURRENCY_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTRACT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_CONTRACT_ADDRESS = "BBBBBBBBBB";

    @Autowired
    private AirdropDetailsRepository airdropDetailsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAirdropDetailsMockMvc;

    private AirdropDetails airdropDetails;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AirdropDetailsResource airdropDetailsResource = new AirdropDetailsResource(airdropDetailsRepository);
        this.restAirdropDetailsMockMvc = MockMvcBuilders.standaloneSetup(airdropDetailsResource)
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
    public static AirdropDetails createEntity(EntityManager em) {
        AirdropDetails airdropDetails = new AirdropDetails()
            .title(DEFAULT_TITLE)
            .currencyName(DEFAULT_CURRENCY_NAME)
            .currencyType(DEFAULT_CURRENCY_TYPE)
            .contractAddress(DEFAULT_CONTRACT_ADDRESS);
        return airdropDetails;
    }

    @Before
    public void initTest() {
        airdropDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createAirdropDetails() throws Exception {
        int databaseSizeBeforeCreate = airdropDetailsRepository.findAll().size();

        // Create the AirdropDetails
        restAirdropDetailsMockMvc.perform(post("/api/airdrop-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airdropDetails)))
            .andExpect(status().isCreated());

        // Validate the AirdropDetails in the database
        List<AirdropDetails> airdropDetailsList = airdropDetailsRepository.findAll();
        assertThat(airdropDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        AirdropDetails testAirdropDetails = airdropDetailsList.get(airdropDetailsList.size() - 1);
        assertThat(testAirdropDetails.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testAirdropDetails.getCurrencyName()).isEqualTo(DEFAULT_CURRENCY_NAME);
        assertThat(testAirdropDetails.getCurrencyType()).isEqualTo(DEFAULT_CURRENCY_TYPE);
        assertThat(testAirdropDetails.getContractAddress()).isEqualTo(DEFAULT_CONTRACT_ADDRESS);
    }

    @Test
    @Transactional
    public void createAirdropDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = airdropDetailsRepository.findAll().size();

        // Create the AirdropDetails with an existing ID
        airdropDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAirdropDetailsMockMvc.perform(post("/api/airdrop-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airdropDetails)))
            .andExpect(status().isBadRequest());

        // Validate the AirdropDetails in the database
        List<AirdropDetails> airdropDetailsList = airdropDetailsRepository.findAll();
        assertThat(airdropDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAirdropDetails() throws Exception {
        // Initialize the database
        airdropDetailsRepository.saveAndFlush(airdropDetails);

        // Get all the airdropDetailsList
        restAirdropDetailsMockMvc.perform(get("/api/airdrop-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(airdropDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].currencyName").value(hasItem(DEFAULT_CURRENCY_NAME.toString())))
            .andExpect(jsonPath("$.[*].currencyType").value(hasItem(DEFAULT_CURRENCY_TYPE.toString())))
            .andExpect(jsonPath("$.[*].contractAddress").value(hasItem(DEFAULT_CONTRACT_ADDRESS.toString())));
    }

    @Test
    @Transactional
    public void getAirdropDetails() throws Exception {
        // Initialize the database
        airdropDetailsRepository.saveAndFlush(airdropDetails);

        // Get the airdropDetails
        restAirdropDetailsMockMvc.perform(get("/api/airdrop-details/{id}", airdropDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(airdropDetails.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.currencyName").value(DEFAULT_CURRENCY_NAME.toString()))
            .andExpect(jsonPath("$.currencyType").value(DEFAULT_CURRENCY_TYPE.toString()))
            .andExpect(jsonPath("$.contractAddress").value(DEFAULT_CONTRACT_ADDRESS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAirdropDetails() throws Exception {
        // Get the airdropDetails
        restAirdropDetailsMockMvc.perform(get("/api/airdrop-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAirdropDetails() throws Exception {
        // Initialize the database
        airdropDetailsRepository.saveAndFlush(airdropDetails);
        int databaseSizeBeforeUpdate = airdropDetailsRepository.findAll().size();

        // Update the airdropDetails
        AirdropDetails updatedAirdropDetails = airdropDetailsRepository.findOne(airdropDetails.getId());
        // Disconnect from session so that the updates on updatedAirdropDetails are not directly saved in db
        em.detach(updatedAirdropDetails);
        updatedAirdropDetails
            .title(UPDATED_TITLE)
            .currencyName(UPDATED_CURRENCY_NAME)
            .currencyType(UPDATED_CURRENCY_TYPE)
            .contractAddress(UPDATED_CONTRACT_ADDRESS);

        restAirdropDetailsMockMvc.perform(put("/api/airdrop-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAirdropDetails)))
            .andExpect(status().isOk());

        // Validate the AirdropDetails in the database
        List<AirdropDetails> airdropDetailsList = airdropDetailsRepository.findAll();
        assertThat(airdropDetailsList).hasSize(databaseSizeBeforeUpdate);
        AirdropDetails testAirdropDetails = airdropDetailsList.get(airdropDetailsList.size() - 1);
        assertThat(testAirdropDetails.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testAirdropDetails.getCurrencyName()).isEqualTo(UPDATED_CURRENCY_NAME);
        assertThat(testAirdropDetails.getCurrencyType()).isEqualTo(UPDATED_CURRENCY_TYPE);
        assertThat(testAirdropDetails.getContractAddress()).isEqualTo(UPDATED_CONTRACT_ADDRESS);
    }

    @Test
    @Transactional
    public void updateNonExistingAirdropDetails() throws Exception {
        int databaseSizeBeforeUpdate = airdropDetailsRepository.findAll().size();

        // Create the AirdropDetails

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAirdropDetailsMockMvc.perform(put("/api/airdrop-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airdropDetails)))
            .andExpect(status().isCreated());

        // Validate the AirdropDetails in the database
        List<AirdropDetails> airdropDetailsList = airdropDetailsRepository.findAll();
        assertThat(airdropDetailsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAirdropDetails() throws Exception {
        // Initialize the database
        airdropDetailsRepository.saveAndFlush(airdropDetails);
        int databaseSizeBeforeDelete = airdropDetailsRepository.findAll().size();

        // Get the airdropDetails
        restAirdropDetailsMockMvc.perform(delete("/api/airdrop-details/{id}", airdropDetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AirdropDetails> airdropDetailsList = airdropDetailsRepository.findAll();
        assertThat(airdropDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AirdropDetails.class);
        AirdropDetails airdropDetails1 = new AirdropDetails();
        airdropDetails1.setId(1L);
        AirdropDetails airdropDetails2 = new AirdropDetails();
        airdropDetails2.setId(airdropDetails1.getId());
        assertThat(airdropDetails1).isEqualTo(airdropDetails2);
        airdropDetails2.setId(2L);
        assertThat(airdropDetails1).isNotEqualTo(airdropDetails2);
        airdropDetails1.setId(null);
        assertThat(airdropDetails1).isNotEqualTo(airdropDetails2);
    }
}
