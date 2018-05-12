package me.airdrops.abcdeapp.web.rest;

import me.airdrops.abcdeapp.AbcdeApp;

import me.airdrops.abcdeapp.domain.CampaignRewards;
import me.airdrops.abcdeapp.repository.CampaignRewardsRepository;
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
 * Test class for the CampaignRewardsResource REST controller.
 *
 * @see CampaignRewardsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AbcdeApp.class)
public class CampaignRewardsResourceIntTest {

    private static final String DEFAULT_REWARD_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_REWARD_TYPE = "BBBBBBBBBB";

    private static final Integer DEFAULT_REWARD_TOTAL = 1;
    private static final Integer UPDATED_REWARD_TOTAL = 2;

    @Autowired
    private CampaignRewardsRepository campaignRewardsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCampaignRewardsMockMvc;

    private CampaignRewards campaignRewards;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CampaignRewardsResource campaignRewardsResource = new CampaignRewardsResource(campaignRewardsRepository);
        this.restCampaignRewardsMockMvc = MockMvcBuilders.standaloneSetup(campaignRewardsResource)
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
    public static CampaignRewards createEntity(EntityManager em) {
        CampaignRewards campaignRewards = new CampaignRewards()
            .rewardType(DEFAULT_REWARD_TYPE)
            .rewardTotal(DEFAULT_REWARD_TOTAL);
        return campaignRewards;
    }

    @Before
    public void initTest() {
        campaignRewards = createEntity(em);
    }

    @Test
    @Transactional
    public void createCampaignRewards() throws Exception {
        int databaseSizeBeforeCreate = campaignRewardsRepository.findAll().size();

        // Create the CampaignRewards
        restCampaignRewardsMockMvc.perform(post("/api/campaign-rewards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignRewards)))
            .andExpect(status().isCreated());

        // Validate the CampaignRewards in the database
        List<CampaignRewards> campaignRewardsList = campaignRewardsRepository.findAll();
        assertThat(campaignRewardsList).hasSize(databaseSizeBeforeCreate + 1);
        CampaignRewards testCampaignRewards = campaignRewardsList.get(campaignRewardsList.size() - 1);
        assertThat(testCampaignRewards.getRewardType()).isEqualTo(DEFAULT_REWARD_TYPE);
        assertThat(testCampaignRewards.getRewardTotal()).isEqualTo(DEFAULT_REWARD_TOTAL);
    }

    @Test
    @Transactional
    public void createCampaignRewardsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = campaignRewardsRepository.findAll().size();

        // Create the CampaignRewards with an existing ID
        campaignRewards.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCampaignRewardsMockMvc.perform(post("/api/campaign-rewards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignRewards)))
            .andExpect(status().isBadRequest());

        // Validate the CampaignRewards in the database
        List<CampaignRewards> campaignRewardsList = campaignRewardsRepository.findAll();
        assertThat(campaignRewardsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCampaignRewards() throws Exception {
        // Initialize the database
        campaignRewardsRepository.saveAndFlush(campaignRewards);

        // Get all the campaignRewardsList
        restCampaignRewardsMockMvc.perform(get("/api/campaign-rewards?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(campaignRewards.getId().intValue())))
            .andExpect(jsonPath("$.[*].rewardType").value(hasItem(DEFAULT_REWARD_TYPE.toString())))
            .andExpect(jsonPath("$.[*].rewardTotal").value(hasItem(DEFAULT_REWARD_TOTAL)));
    }

    @Test
    @Transactional
    public void getCampaignRewards() throws Exception {
        // Initialize the database
        campaignRewardsRepository.saveAndFlush(campaignRewards);

        // Get the campaignRewards
        restCampaignRewardsMockMvc.perform(get("/api/campaign-rewards/{id}", campaignRewards.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(campaignRewards.getId().intValue()))
            .andExpect(jsonPath("$.rewardType").value(DEFAULT_REWARD_TYPE.toString()))
            .andExpect(jsonPath("$.rewardTotal").value(DEFAULT_REWARD_TOTAL));
    }

    @Test
    @Transactional
    public void getNonExistingCampaignRewards() throws Exception {
        // Get the campaignRewards
        restCampaignRewardsMockMvc.perform(get("/api/campaign-rewards/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCampaignRewards() throws Exception {
        // Initialize the database
        campaignRewardsRepository.saveAndFlush(campaignRewards);
        int databaseSizeBeforeUpdate = campaignRewardsRepository.findAll().size();

        // Update the campaignRewards
        CampaignRewards updatedCampaignRewards = campaignRewardsRepository.findOne(campaignRewards.getId());
        // Disconnect from session so that the updates on updatedCampaignRewards are not directly saved in db
        em.detach(updatedCampaignRewards);
        updatedCampaignRewards
            .rewardType(UPDATED_REWARD_TYPE)
            .rewardTotal(UPDATED_REWARD_TOTAL);

        restCampaignRewardsMockMvc.perform(put("/api/campaign-rewards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCampaignRewards)))
            .andExpect(status().isOk());

        // Validate the CampaignRewards in the database
        List<CampaignRewards> campaignRewardsList = campaignRewardsRepository.findAll();
        assertThat(campaignRewardsList).hasSize(databaseSizeBeforeUpdate);
        CampaignRewards testCampaignRewards = campaignRewardsList.get(campaignRewardsList.size() - 1);
        assertThat(testCampaignRewards.getRewardType()).isEqualTo(UPDATED_REWARD_TYPE);
        assertThat(testCampaignRewards.getRewardTotal()).isEqualTo(UPDATED_REWARD_TOTAL);
    }

    @Test
    @Transactional
    public void updateNonExistingCampaignRewards() throws Exception {
        int databaseSizeBeforeUpdate = campaignRewardsRepository.findAll().size();

        // Create the CampaignRewards

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCampaignRewardsMockMvc.perform(put("/api/campaign-rewards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignRewards)))
            .andExpect(status().isCreated());

        // Validate the CampaignRewards in the database
        List<CampaignRewards> campaignRewardsList = campaignRewardsRepository.findAll();
        assertThat(campaignRewardsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCampaignRewards() throws Exception {
        // Initialize the database
        campaignRewardsRepository.saveAndFlush(campaignRewards);
        int databaseSizeBeforeDelete = campaignRewardsRepository.findAll().size();

        // Get the campaignRewards
        restCampaignRewardsMockMvc.perform(delete("/api/campaign-rewards/{id}", campaignRewards.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CampaignRewards> campaignRewardsList = campaignRewardsRepository.findAll();
        assertThat(campaignRewardsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CampaignRewards.class);
        CampaignRewards campaignRewards1 = new CampaignRewards();
        campaignRewards1.setId(1L);
        CampaignRewards campaignRewards2 = new CampaignRewards();
        campaignRewards2.setId(campaignRewards1.getId());
        assertThat(campaignRewards1).isEqualTo(campaignRewards2);
        campaignRewards2.setId(2L);
        assertThat(campaignRewards1).isNotEqualTo(campaignRewards2);
        campaignRewards1.setId(null);
        assertThat(campaignRewards1).isNotEqualTo(campaignRewards2);
    }
}
