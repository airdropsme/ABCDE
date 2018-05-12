package me.airdrops.abcdeapp.web.rest;

import me.airdrops.abcdeapp.AbcdeApp;

import me.airdrops.abcdeapp.domain.CampaignAnalaytics;
import me.airdrops.abcdeapp.repository.CampaignAnalayticsRepository;
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
 * Test class for the CampaignAnalayticsResource REST controller.
 *
 * @see CampaignAnalayticsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AbcdeApp.class)
public class CampaignAnalayticsResourceIntTest {

    private static final Integer DEFAULT_VIEWS = 1;
    private static final Integer UPDATED_VIEWS = 2;

    private static final Integer DEFAULT_REFERRAL_COUNT = 1;
    private static final Integer UPDATED_REFERRAL_COUNT = 2;

    @Autowired
    private CampaignAnalayticsRepository campaignAnalayticsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCampaignAnalayticsMockMvc;

    private CampaignAnalaytics campaignAnalaytics;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CampaignAnalayticsResource campaignAnalayticsResource = new CampaignAnalayticsResource(campaignAnalayticsRepository);
        this.restCampaignAnalayticsMockMvc = MockMvcBuilders.standaloneSetup(campaignAnalayticsResource)
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
    public static CampaignAnalaytics createEntity(EntityManager em) {
        CampaignAnalaytics campaignAnalaytics = new CampaignAnalaytics()
            .views(DEFAULT_VIEWS)
            .referralCount(DEFAULT_REFERRAL_COUNT);
        return campaignAnalaytics;
    }

    @Before
    public void initTest() {
        campaignAnalaytics = createEntity(em);
    }

    @Test
    @Transactional
    public void createCampaignAnalaytics() throws Exception {
        int databaseSizeBeforeCreate = campaignAnalayticsRepository.findAll().size();

        // Create the CampaignAnalaytics
        restCampaignAnalayticsMockMvc.perform(post("/api/campaign-analaytics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignAnalaytics)))
            .andExpect(status().isCreated());

        // Validate the CampaignAnalaytics in the database
        List<CampaignAnalaytics> campaignAnalayticsList = campaignAnalayticsRepository.findAll();
        assertThat(campaignAnalayticsList).hasSize(databaseSizeBeforeCreate + 1);
        CampaignAnalaytics testCampaignAnalaytics = campaignAnalayticsList.get(campaignAnalayticsList.size() - 1);
        assertThat(testCampaignAnalaytics.getViews()).isEqualTo(DEFAULT_VIEWS);
        assertThat(testCampaignAnalaytics.getReferralCount()).isEqualTo(DEFAULT_REFERRAL_COUNT);
    }

    @Test
    @Transactional
    public void createCampaignAnalayticsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = campaignAnalayticsRepository.findAll().size();

        // Create the CampaignAnalaytics with an existing ID
        campaignAnalaytics.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCampaignAnalayticsMockMvc.perform(post("/api/campaign-analaytics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignAnalaytics)))
            .andExpect(status().isBadRequest());

        // Validate the CampaignAnalaytics in the database
        List<CampaignAnalaytics> campaignAnalayticsList = campaignAnalayticsRepository.findAll();
        assertThat(campaignAnalayticsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCampaignAnalaytics() throws Exception {
        // Initialize the database
        campaignAnalayticsRepository.saveAndFlush(campaignAnalaytics);

        // Get all the campaignAnalayticsList
        restCampaignAnalayticsMockMvc.perform(get("/api/campaign-analaytics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(campaignAnalaytics.getId().intValue())))
            .andExpect(jsonPath("$.[*].views").value(hasItem(DEFAULT_VIEWS)))
            .andExpect(jsonPath("$.[*].referralCount").value(hasItem(DEFAULT_REFERRAL_COUNT)));
    }

    @Test
    @Transactional
    public void getCampaignAnalaytics() throws Exception {
        // Initialize the database
        campaignAnalayticsRepository.saveAndFlush(campaignAnalaytics);

        // Get the campaignAnalaytics
        restCampaignAnalayticsMockMvc.perform(get("/api/campaign-analaytics/{id}", campaignAnalaytics.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(campaignAnalaytics.getId().intValue()))
            .andExpect(jsonPath("$.views").value(DEFAULT_VIEWS))
            .andExpect(jsonPath("$.referralCount").value(DEFAULT_REFERRAL_COUNT));
    }

    @Test
    @Transactional
    public void getNonExistingCampaignAnalaytics() throws Exception {
        // Get the campaignAnalaytics
        restCampaignAnalayticsMockMvc.perform(get("/api/campaign-analaytics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCampaignAnalaytics() throws Exception {
        // Initialize the database
        campaignAnalayticsRepository.saveAndFlush(campaignAnalaytics);
        int databaseSizeBeforeUpdate = campaignAnalayticsRepository.findAll().size();

        // Update the campaignAnalaytics
        CampaignAnalaytics updatedCampaignAnalaytics = campaignAnalayticsRepository.findOne(campaignAnalaytics.getId());
        // Disconnect from session so that the updates on updatedCampaignAnalaytics are not directly saved in db
        em.detach(updatedCampaignAnalaytics);
        updatedCampaignAnalaytics
            .views(UPDATED_VIEWS)
            .referralCount(UPDATED_REFERRAL_COUNT);

        restCampaignAnalayticsMockMvc.perform(put("/api/campaign-analaytics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCampaignAnalaytics)))
            .andExpect(status().isOk());

        // Validate the CampaignAnalaytics in the database
        List<CampaignAnalaytics> campaignAnalayticsList = campaignAnalayticsRepository.findAll();
        assertThat(campaignAnalayticsList).hasSize(databaseSizeBeforeUpdate);
        CampaignAnalaytics testCampaignAnalaytics = campaignAnalayticsList.get(campaignAnalayticsList.size() - 1);
        assertThat(testCampaignAnalaytics.getViews()).isEqualTo(UPDATED_VIEWS);
        assertThat(testCampaignAnalaytics.getReferralCount()).isEqualTo(UPDATED_REFERRAL_COUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingCampaignAnalaytics() throws Exception {
        int databaseSizeBeforeUpdate = campaignAnalayticsRepository.findAll().size();

        // Create the CampaignAnalaytics

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCampaignAnalayticsMockMvc.perform(put("/api/campaign-analaytics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignAnalaytics)))
            .andExpect(status().isCreated());

        // Validate the CampaignAnalaytics in the database
        List<CampaignAnalaytics> campaignAnalayticsList = campaignAnalayticsRepository.findAll();
        assertThat(campaignAnalayticsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCampaignAnalaytics() throws Exception {
        // Initialize the database
        campaignAnalayticsRepository.saveAndFlush(campaignAnalaytics);
        int databaseSizeBeforeDelete = campaignAnalayticsRepository.findAll().size();

        // Get the campaignAnalaytics
        restCampaignAnalayticsMockMvc.perform(delete("/api/campaign-analaytics/{id}", campaignAnalaytics.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CampaignAnalaytics> campaignAnalayticsList = campaignAnalayticsRepository.findAll();
        assertThat(campaignAnalayticsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CampaignAnalaytics.class);
        CampaignAnalaytics campaignAnalaytics1 = new CampaignAnalaytics();
        campaignAnalaytics1.setId(1L);
        CampaignAnalaytics campaignAnalaytics2 = new CampaignAnalaytics();
        campaignAnalaytics2.setId(campaignAnalaytics1.getId());
        assertThat(campaignAnalaytics1).isEqualTo(campaignAnalaytics2);
        campaignAnalaytics2.setId(2L);
        assertThat(campaignAnalaytics1).isNotEqualTo(campaignAnalaytics2);
        campaignAnalaytics1.setId(null);
        assertThat(campaignAnalaytics1).isNotEqualTo(campaignAnalaytics2);
    }
}
