package me.airdrops.abcdeapp.web.rest;

import me.airdrops.abcdeapp.AbcdeApp;

import me.airdrops.abcdeapp.domain.SocialmediaDetails;
import me.airdrops.abcdeapp.repository.SocialmediaDetailsRepository;
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
 * Test class for the SocialmediaDetailsResource REST controller.
 *
 * @see SocialmediaDetailsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AbcdeApp.class)
public class SocialmediaDetailsResourceIntTest {

    private static final String DEFAULT_FACEBOOK = "AAAAAAAAAA";
    private static final String UPDATED_FACEBOOK = "BBBBBBBBBB";

    private static final String DEFAULT_TWITTER = "AAAAAAAAAA";
    private static final String UPDATED_TWITTER = "BBBBBBBBBB";

    private static final String DEFAULT_PINTEREST = "AAAAAAAAAA";
    private static final String UPDATED_PINTEREST = "BBBBBBBBBB";

    private static final String DEFAULT_YOUTUBE = "AAAAAAAAAA";
    private static final String UPDATED_YOUTUBE = "BBBBBBBBBB";

    @Autowired
    private SocialmediaDetailsRepository socialmediaDetailsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSocialmediaDetailsMockMvc;

    private SocialmediaDetails socialmediaDetails;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SocialmediaDetailsResource socialmediaDetailsResource = new SocialmediaDetailsResource(socialmediaDetailsRepository);
        this.restSocialmediaDetailsMockMvc = MockMvcBuilders.standaloneSetup(socialmediaDetailsResource)
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
    public static SocialmediaDetails createEntity(EntityManager em) {
        SocialmediaDetails socialmediaDetails = new SocialmediaDetails()
            .facebook(DEFAULT_FACEBOOK)
            .twitter(DEFAULT_TWITTER)
            .pinterest(DEFAULT_PINTEREST)
            .youtube(DEFAULT_YOUTUBE);
        return socialmediaDetails;
    }

    @Before
    public void initTest() {
        socialmediaDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createSocialmediaDetails() throws Exception {
        int databaseSizeBeforeCreate = socialmediaDetailsRepository.findAll().size();

        // Create the SocialmediaDetails
        restSocialmediaDetailsMockMvc.perform(post("/api/socialmedia-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialmediaDetails)))
            .andExpect(status().isCreated());

        // Validate the SocialmediaDetails in the database
        List<SocialmediaDetails> socialmediaDetailsList = socialmediaDetailsRepository.findAll();
        assertThat(socialmediaDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        SocialmediaDetails testSocialmediaDetails = socialmediaDetailsList.get(socialmediaDetailsList.size() - 1);
        assertThat(testSocialmediaDetails.getFacebook()).isEqualTo(DEFAULT_FACEBOOK);
        assertThat(testSocialmediaDetails.getTwitter()).isEqualTo(DEFAULT_TWITTER);
        assertThat(testSocialmediaDetails.getPinterest()).isEqualTo(DEFAULT_PINTEREST);
        assertThat(testSocialmediaDetails.getYoutube()).isEqualTo(DEFAULT_YOUTUBE);
    }

    @Test
    @Transactional
    public void createSocialmediaDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = socialmediaDetailsRepository.findAll().size();

        // Create the SocialmediaDetails with an existing ID
        socialmediaDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSocialmediaDetailsMockMvc.perform(post("/api/socialmedia-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialmediaDetails)))
            .andExpect(status().isBadRequest());

        // Validate the SocialmediaDetails in the database
        List<SocialmediaDetails> socialmediaDetailsList = socialmediaDetailsRepository.findAll();
        assertThat(socialmediaDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSocialmediaDetails() throws Exception {
        // Initialize the database
        socialmediaDetailsRepository.saveAndFlush(socialmediaDetails);

        // Get all the socialmediaDetailsList
        restSocialmediaDetailsMockMvc.perform(get("/api/socialmedia-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(socialmediaDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].facebook").value(hasItem(DEFAULT_FACEBOOK.toString())))
            .andExpect(jsonPath("$.[*].twitter").value(hasItem(DEFAULT_TWITTER.toString())))
            .andExpect(jsonPath("$.[*].pinterest").value(hasItem(DEFAULT_PINTEREST.toString())))
            .andExpect(jsonPath("$.[*].youtube").value(hasItem(DEFAULT_YOUTUBE.toString())));
    }

    @Test
    @Transactional
    public void getSocialmediaDetails() throws Exception {
        // Initialize the database
        socialmediaDetailsRepository.saveAndFlush(socialmediaDetails);

        // Get the socialmediaDetails
        restSocialmediaDetailsMockMvc.perform(get("/api/socialmedia-details/{id}", socialmediaDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(socialmediaDetails.getId().intValue()))
            .andExpect(jsonPath("$.facebook").value(DEFAULT_FACEBOOK.toString()))
            .andExpect(jsonPath("$.twitter").value(DEFAULT_TWITTER.toString()))
            .andExpect(jsonPath("$.pinterest").value(DEFAULT_PINTEREST.toString()))
            .andExpect(jsonPath("$.youtube").value(DEFAULT_YOUTUBE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSocialmediaDetails() throws Exception {
        // Get the socialmediaDetails
        restSocialmediaDetailsMockMvc.perform(get("/api/socialmedia-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSocialmediaDetails() throws Exception {
        // Initialize the database
        socialmediaDetailsRepository.saveAndFlush(socialmediaDetails);
        int databaseSizeBeforeUpdate = socialmediaDetailsRepository.findAll().size();

        // Update the socialmediaDetails
        SocialmediaDetails updatedSocialmediaDetails = socialmediaDetailsRepository.findOne(socialmediaDetails.getId());
        // Disconnect from session so that the updates on updatedSocialmediaDetails are not directly saved in db
        em.detach(updatedSocialmediaDetails);
        updatedSocialmediaDetails
            .facebook(UPDATED_FACEBOOK)
            .twitter(UPDATED_TWITTER)
            .pinterest(UPDATED_PINTEREST)
            .youtube(UPDATED_YOUTUBE);

        restSocialmediaDetailsMockMvc.perform(put("/api/socialmedia-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSocialmediaDetails)))
            .andExpect(status().isOk());

        // Validate the SocialmediaDetails in the database
        List<SocialmediaDetails> socialmediaDetailsList = socialmediaDetailsRepository.findAll();
        assertThat(socialmediaDetailsList).hasSize(databaseSizeBeforeUpdate);
        SocialmediaDetails testSocialmediaDetails = socialmediaDetailsList.get(socialmediaDetailsList.size() - 1);
        assertThat(testSocialmediaDetails.getFacebook()).isEqualTo(UPDATED_FACEBOOK);
        assertThat(testSocialmediaDetails.getTwitter()).isEqualTo(UPDATED_TWITTER);
        assertThat(testSocialmediaDetails.getPinterest()).isEqualTo(UPDATED_PINTEREST);
        assertThat(testSocialmediaDetails.getYoutube()).isEqualTo(UPDATED_YOUTUBE);
    }

    @Test
    @Transactional
    public void updateNonExistingSocialmediaDetails() throws Exception {
        int databaseSizeBeforeUpdate = socialmediaDetailsRepository.findAll().size();

        // Create the SocialmediaDetails

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSocialmediaDetailsMockMvc.perform(put("/api/socialmedia-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(socialmediaDetails)))
            .andExpect(status().isCreated());

        // Validate the SocialmediaDetails in the database
        List<SocialmediaDetails> socialmediaDetailsList = socialmediaDetailsRepository.findAll();
        assertThat(socialmediaDetailsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSocialmediaDetails() throws Exception {
        // Initialize the database
        socialmediaDetailsRepository.saveAndFlush(socialmediaDetails);
        int databaseSizeBeforeDelete = socialmediaDetailsRepository.findAll().size();

        // Get the socialmediaDetails
        restSocialmediaDetailsMockMvc.perform(delete("/api/socialmedia-details/{id}", socialmediaDetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SocialmediaDetails> socialmediaDetailsList = socialmediaDetailsRepository.findAll();
        assertThat(socialmediaDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SocialmediaDetails.class);
        SocialmediaDetails socialmediaDetails1 = new SocialmediaDetails();
        socialmediaDetails1.setId(1L);
        SocialmediaDetails socialmediaDetails2 = new SocialmediaDetails();
        socialmediaDetails2.setId(socialmediaDetails1.getId());
        assertThat(socialmediaDetails1).isEqualTo(socialmediaDetails2);
        socialmediaDetails2.setId(2L);
        assertThat(socialmediaDetails1).isNotEqualTo(socialmediaDetails2);
        socialmediaDetails1.setId(null);
        assertThat(socialmediaDetails1).isNotEqualTo(socialmediaDetails2);
    }
}
