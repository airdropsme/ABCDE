package me.airdrops.abcdeapp.web.rest;

import me.airdrops.abcdeapp.AbcdeApp;

import me.airdrops.abcdeapp.domain.CampaignParticipant;
import me.airdrops.abcdeapp.repository.CampaignParticipantRepository;
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
 * Test class for the CampaignParticipantResource REST controller.
 *
 * @see CampaignParticipantResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AbcdeApp.class)
public class CampaignParticipantResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_UNIQUE_URL = "AAAAAAAAAA";
    private static final String UPDATED_UNIQUE_URL = "BBBBBBBBBB";

    private static final Integer DEFAULT_POINTS = 1;
    private static final Integer UPDATED_POINTS = 2;

    @Autowired
    private CampaignParticipantRepository campaignParticipantRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCampaignParticipantMockMvc;

    private CampaignParticipant campaignParticipant;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CampaignParticipantResource campaignParticipantResource = new CampaignParticipantResource(campaignParticipantRepository);
        this.restCampaignParticipantMockMvc = MockMvcBuilders.standaloneSetup(campaignParticipantResource)
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
    public static CampaignParticipant createEntity(EntityManager em) {
        CampaignParticipant campaignParticipant = new CampaignParticipant()
            .name(DEFAULT_NAME)
            .email(DEFAULT_EMAIL)
            .uniqueURL(DEFAULT_UNIQUE_URL)
            .points(DEFAULT_POINTS);
        return campaignParticipant;
    }

    @Before
    public void initTest() {
        campaignParticipant = createEntity(em);
    }

    @Test
    @Transactional
    public void createCampaignParticipant() throws Exception {
        int databaseSizeBeforeCreate = campaignParticipantRepository.findAll().size();

        // Create the CampaignParticipant
        restCampaignParticipantMockMvc.perform(post("/api/campaign-participants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignParticipant)))
            .andExpect(status().isCreated());

        // Validate the CampaignParticipant in the database
        List<CampaignParticipant> campaignParticipantList = campaignParticipantRepository.findAll();
        assertThat(campaignParticipantList).hasSize(databaseSizeBeforeCreate + 1);
        CampaignParticipant testCampaignParticipant = campaignParticipantList.get(campaignParticipantList.size() - 1);
        assertThat(testCampaignParticipant.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCampaignParticipant.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testCampaignParticipant.getUniqueURL()).isEqualTo(DEFAULT_UNIQUE_URL);
        assertThat(testCampaignParticipant.getPoints()).isEqualTo(DEFAULT_POINTS);
    }

    @Test
    @Transactional
    public void createCampaignParticipantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = campaignParticipantRepository.findAll().size();

        // Create the CampaignParticipant with an existing ID
        campaignParticipant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCampaignParticipantMockMvc.perform(post("/api/campaign-participants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignParticipant)))
            .andExpect(status().isBadRequest());

        // Validate the CampaignParticipant in the database
        List<CampaignParticipant> campaignParticipantList = campaignParticipantRepository.findAll();
        assertThat(campaignParticipantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCampaignParticipants() throws Exception {
        // Initialize the database
        campaignParticipantRepository.saveAndFlush(campaignParticipant);

        // Get all the campaignParticipantList
        restCampaignParticipantMockMvc.perform(get("/api/campaign-participants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(campaignParticipant.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].uniqueURL").value(hasItem(DEFAULT_UNIQUE_URL.toString())))
            .andExpect(jsonPath("$.[*].points").value(hasItem(DEFAULT_POINTS)));
    }

    @Test
    @Transactional
    public void getCampaignParticipant() throws Exception {
        // Initialize the database
        campaignParticipantRepository.saveAndFlush(campaignParticipant);

        // Get the campaignParticipant
        restCampaignParticipantMockMvc.perform(get("/api/campaign-participants/{id}", campaignParticipant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(campaignParticipant.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.uniqueURL").value(DEFAULT_UNIQUE_URL.toString()))
            .andExpect(jsonPath("$.points").value(DEFAULT_POINTS));
    }

    @Test
    @Transactional
    public void getNonExistingCampaignParticipant() throws Exception {
        // Get the campaignParticipant
        restCampaignParticipantMockMvc.perform(get("/api/campaign-participants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCampaignParticipant() throws Exception {
        // Initialize the database
        campaignParticipantRepository.saveAndFlush(campaignParticipant);
        int databaseSizeBeforeUpdate = campaignParticipantRepository.findAll().size();

        // Update the campaignParticipant
        CampaignParticipant updatedCampaignParticipant = campaignParticipantRepository.findOne(campaignParticipant.getId());
        // Disconnect from session so that the updates on updatedCampaignParticipant are not directly saved in db
        em.detach(updatedCampaignParticipant);
        updatedCampaignParticipant
            .name(UPDATED_NAME)
            .email(UPDATED_EMAIL)
            .uniqueURL(UPDATED_UNIQUE_URL)
            .points(UPDATED_POINTS);

        restCampaignParticipantMockMvc.perform(put("/api/campaign-participants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCampaignParticipant)))
            .andExpect(status().isOk());

        // Validate the CampaignParticipant in the database
        List<CampaignParticipant> campaignParticipantList = campaignParticipantRepository.findAll();
        assertThat(campaignParticipantList).hasSize(databaseSizeBeforeUpdate);
        CampaignParticipant testCampaignParticipant = campaignParticipantList.get(campaignParticipantList.size() - 1);
        assertThat(testCampaignParticipant.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCampaignParticipant.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCampaignParticipant.getUniqueURL()).isEqualTo(UPDATED_UNIQUE_URL);
        assertThat(testCampaignParticipant.getPoints()).isEqualTo(UPDATED_POINTS);
    }

    @Test
    @Transactional
    public void updateNonExistingCampaignParticipant() throws Exception {
        int databaseSizeBeforeUpdate = campaignParticipantRepository.findAll().size();

        // Create the CampaignParticipant

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCampaignParticipantMockMvc.perform(put("/api/campaign-participants")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignParticipant)))
            .andExpect(status().isCreated());

        // Validate the CampaignParticipant in the database
        List<CampaignParticipant> campaignParticipantList = campaignParticipantRepository.findAll();
        assertThat(campaignParticipantList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCampaignParticipant() throws Exception {
        // Initialize the database
        campaignParticipantRepository.saveAndFlush(campaignParticipant);
        int databaseSizeBeforeDelete = campaignParticipantRepository.findAll().size();

        // Get the campaignParticipant
        restCampaignParticipantMockMvc.perform(delete("/api/campaign-participants/{id}", campaignParticipant.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CampaignParticipant> campaignParticipantList = campaignParticipantRepository.findAll();
        assertThat(campaignParticipantList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CampaignParticipant.class);
        CampaignParticipant campaignParticipant1 = new CampaignParticipant();
        campaignParticipant1.setId(1L);
        CampaignParticipant campaignParticipant2 = new CampaignParticipant();
        campaignParticipant2.setId(campaignParticipant1.getId());
        assertThat(campaignParticipant1).isEqualTo(campaignParticipant2);
        campaignParticipant2.setId(2L);
        assertThat(campaignParticipant1).isNotEqualTo(campaignParticipant2);
        campaignParticipant1.setId(null);
        assertThat(campaignParticipant1).isNotEqualTo(campaignParticipant2);
    }
}
