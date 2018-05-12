package me.airdrops.abcdeapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import me.airdrops.abcdeapp.domain.CampaignAnalaytics;

import me.airdrops.abcdeapp.repository.CampaignAnalayticsRepository;
import me.airdrops.abcdeapp.web.rest.errors.BadRequestAlertException;
import me.airdrops.abcdeapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CampaignAnalaytics.
 */
@RestController
@RequestMapping("/api")
public class CampaignAnalayticsResource {

    private final Logger log = LoggerFactory.getLogger(CampaignAnalayticsResource.class);

    private static final String ENTITY_NAME = "campaignAnalaytics";

    private final CampaignAnalayticsRepository campaignAnalayticsRepository;

    public CampaignAnalayticsResource(CampaignAnalayticsRepository campaignAnalayticsRepository) {
        this.campaignAnalayticsRepository = campaignAnalayticsRepository;
    }

    /**
     * POST  /campaign-analaytics : Create a new campaignAnalaytics.
     *
     * @param campaignAnalaytics the campaignAnalaytics to create
     * @return the ResponseEntity with status 201 (Created) and with body the new campaignAnalaytics, or with status 400 (Bad Request) if the campaignAnalaytics has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/campaign-analaytics")
    @Timed
    public ResponseEntity<CampaignAnalaytics> createCampaignAnalaytics(@RequestBody CampaignAnalaytics campaignAnalaytics) throws URISyntaxException {
        log.debug("REST request to save CampaignAnalaytics : {}", campaignAnalaytics);
        if (campaignAnalaytics.getId() != null) {
            throw new BadRequestAlertException("A new campaignAnalaytics cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CampaignAnalaytics result = campaignAnalayticsRepository.save(campaignAnalaytics);
        return ResponseEntity.created(new URI("/api/campaign-analaytics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /campaign-analaytics : Updates an existing campaignAnalaytics.
     *
     * @param campaignAnalaytics the campaignAnalaytics to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated campaignAnalaytics,
     * or with status 400 (Bad Request) if the campaignAnalaytics is not valid,
     * or with status 500 (Internal Server Error) if the campaignAnalaytics couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/campaign-analaytics")
    @Timed
    public ResponseEntity<CampaignAnalaytics> updateCampaignAnalaytics(@RequestBody CampaignAnalaytics campaignAnalaytics) throws URISyntaxException {
        log.debug("REST request to update CampaignAnalaytics : {}", campaignAnalaytics);
        if (campaignAnalaytics.getId() == null) {
            return createCampaignAnalaytics(campaignAnalaytics);
        }
        CampaignAnalaytics result = campaignAnalayticsRepository.save(campaignAnalaytics);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, campaignAnalaytics.getId().toString()))
            .body(result);
    }

    /**
     * GET  /campaign-analaytics : get all the campaignAnalaytics.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of campaignAnalaytics in body
     */
    @GetMapping("/campaign-analaytics")
    @Timed
    public List<CampaignAnalaytics> getAllCampaignAnalaytics() {
        log.debug("REST request to get all CampaignAnalaytics");
        return campaignAnalayticsRepository.findAll();
        }

    /**
     * GET  /campaign-analaytics/:id : get the "id" campaignAnalaytics.
     *
     * @param id the id of the campaignAnalaytics to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the campaignAnalaytics, or with status 404 (Not Found)
     */
    @GetMapping("/campaign-analaytics/{id}")
    @Timed
    public ResponseEntity<CampaignAnalaytics> getCampaignAnalaytics(@PathVariable Long id) {
        log.debug("REST request to get CampaignAnalaytics : {}", id);
        CampaignAnalaytics campaignAnalaytics = campaignAnalayticsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(campaignAnalaytics));
    }

    /**
     * DELETE  /campaign-analaytics/:id : delete the "id" campaignAnalaytics.
     *
     * @param id the id of the campaignAnalaytics to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/campaign-analaytics/{id}")
    @Timed
    public ResponseEntity<Void> deleteCampaignAnalaytics(@PathVariable Long id) {
        log.debug("REST request to delete CampaignAnalaytics : {}", id);
        campaignAnalayticsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
