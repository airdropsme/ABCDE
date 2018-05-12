package me.airdrops.abcdeapp.web.rest;

import me.airdrops.abcdeapp.AbcdeApp;

import me.airdrops.abcdeapp.domain.CampaignWinner;
import me.airdrops.abcdeapp.repository.CampaignWinnerRepository;
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
 * Test class for the CampaignWinnerResource REST controller.
 *
 * @see CampaignWinnerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AbcdeApp.class)
public class CampaignWinnerResourceIntTest {

    private static final String DEFAULT_WINNER_ID = "AAAAAAAAAA";
    private static final String UPDATED_WINNER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_WINNER_PRIZE = "AAAAAAAAAA";
    private static final String UPDATED_WINNER_PRIZE = "BBBBBBBBBB";

    @Autowired
    private CampaignWinnerRepository campaignWinnerRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCampaignWinnerMockMvc;

    private CampaignWinner campaignWinner;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CampaignWinnerResource campaignWinnerResource = new CampaignWinnerResource(campaignWinnerRepository);
        this.restCampaignWinnerMockMvc = MockMvcBuilders.standaloneSetup(campaignWinnerResource)
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
    public static CampaignWinner createEntity(EntityManager em) {
        CampaignWinner campaignWinner = new CampaignWinner()
            .winnerId(DEFAULT_WINNER_ID)
            .winnerPrize(DEFAULT_WINNER_PRIZE);
        return campaignWinner;
    }

    @Before
    public void initTest() {
        campaignWinner = createEntity(em);
    }

    @Test
    @Transactional
    public void createCampaignWinner() throws Exception {
        int databaseSizeBeforeCreate = campaignWinnerRepository.findAll().size();

        // Create the CampaignWinner
        restCampaignWinnerMockMvc.perform(post("/api/campaign-winners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignWinner)))
            .andExpect(status().isCreated());

        // Validate the CampaignWinner in the database
        List<CampaignWinner> campaignWinnerList = campaignWinnerRepository.findAll();
        assertThat(campaignWinnerList).hasSize(databaseSizeBeforeCreate + 1);
        CampaignWinner testCampaignWinner = campaignWinnerList.get(campaignWinnerList.size() - 1);
        assertThat(testCampaignWinner.getWinnerId()).isEqualTo(DEFAULT_WINNER_ID);
        assertThat(testCampaignWinner.getWinnerPrize()).isEqualTo(DEFAULT_WINNER_PRIZE);
    }

    @Test
    @Transactional
    public void createCampaignWinnerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = campaignWinnerRepository.findAll().size();

        // Create the CampaignWinner with an existing ID
        campaignWinner.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCampaignWinnerMockMvc.perform(post("/api/campaign-winners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignWinner)))
            .andExpect(status().isBadRequest());

        // Validate the CampaignWinner in the database
        List<CampaignWinner> campaignWinnerList = campaignWinnerRepository.findAll();
        assertThat(campaignWinnerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCampaignWinners() throws Exception {
        // Initialize the database
        campaignWinnerRepository.saveAndFlush(campaignWinner);

        // Get all the campaignWinnerList
        restCampaignWinnerMockMvc.perform(get("/api/campaign-winners?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(campaignWinner.getId().intValue())))
            .andExpect(jsonPath("$.[*].winnerId").value(hasItem(DEFAULT_WINNER_ID.toString())))
            .andExpect(jsonPath("$.[*].winnerPrize").value(hasItem(DEFAULT_WINNER_PRIZE.toString())));
    }

    @Test
    @Transactional
    public void getCampaignWinner() throws Exception {
        // Initialize the database
        campaignWinnerRepository.saveAndFlush(campaignWinner);

        // Get the campaignWinner
        restCampaignWinnerMockMvc.perform(get("/api/campaign-winners/{id}", campaignWinner.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(campaignWinner.getId().intValue()))
            .andExpect(jsonPath("$.winnerId").value(DEFAULT_WINNER_ID.toString()))
            .andExpect(jsonPath("$.winnerPrize").value(DEFAULT_WINNER_PRIZE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCampaignWinner() throws Exception {
        // Get the campaignWinner
        restCampaignWinnerMockMvc.perform(get("/api/campaign-winners/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCampaignWinner() throws Exception {
        // Initialize the database
        campaignWinnerRepository.saveAndFlush(campaignWinner);
        int databaseSizeBeforeUpdate = campaignWinnerRepository.findAll().size();

        // Update the campaignWinner
        CampaignWinner updatedCampaignWinner = campaignWinnerRepository.findOne(campaignWinner.getId());
        // Disconnect from session so that the updates on updatedCampaignWinner are not directly saved in db
        em.detach(updatedCampaignWinner);
        updatedCampaignWinner
            .winnerId(UPDATED_WINNER_ID)
            .winnerPrize(UPDATED_WINNER_PRIZE);

        restCampaignWinnerMockMvc.perform(put("/api/campaign-winners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCampaignWinner)))
            .andExpect(status().isOk());

        // Validate the CampaignWinner in the database
        List<CampaignWinner> campaignWinnerList = campaignWinnerRepository.findAll();
        assertThat(campaignWinnerList).hasSize(databaseSizeBeforeUpdate);
        CampaignWinner testCampaignWinner = campaignWinnerList.get(campaignWinnerList.size() - 1);
        assertThat(testCampaignWinner.getWinnerId()).isEqualTo(UPDATED_WINNER_ID);
        assertThat(testCampaignWinner.getWinnerPrize()).isEqualTo(UPDATED_WINNER_PRIZE);
    }

    @Test
    @Transactional
    public void updateNonExistingCampaignWinner() throws Exception {
        int databaseSizeBeforeUpdate = campaignWinnerRepository.findAll().size();

        // Create the CampaignWinner

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCampaignWinnerMockMvc.perform(put("/api/campaign-winners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(campaignWinner)))
            .andExpect(status().isCreated());

        // Validate the CampaignWinner in the database
        List<CampaignWinner> campaignWinnerList = campaignWinnerRepository.findAll();
        assertThat(campaignWinnerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCampaignWinner() throws Exception {
        // Initialize the database
        campaignWinnerRepository.saveAndFlush(campaignWinner);
        int databaseSizeBeforeDelete = campaignWinnerRepository.findAll().size();

        // Get the campaignWinner
        restCampaignWinnerMockMvc.perform(delete("/api/campaign-winners/{id}", campaignWinner.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CampaignWinner> campaignWinnerList = campaignWinnerRepository.findAll();
        assertThat(campaignWinnerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CampaignWinner.class);
        CampaignWinner campaignWinner1 = new CampaignWinner();
        campaignWinner1.setId(1L);
        CampaignWinner campaignWinner2 = new CampaignWinner();
        campaignWinner2.setId(campaignWinner1.getId());
        assertThat(campaignWinner1).isEqualTo(campaignWinner2);
        campaignWinner2.setId(2L);
        assertThat(campaignWinner1).isNotEqualTo(campaignWinner2);
        campaignWinner1.setId(null);
        assertThat(campaignWinner1).isNotEqualTo(campaignWinner2);
    }
}
