package me.airdrops.abcdeapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import me.airdrops.abcdeapp.domain.CampaignWinner;

import me.airdrops.abcdeapp.repository.CampaignWinnerRepository;
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
 * REST controller for managing CampaignWinner.
 */
@RestController
@RequestMapping("/api")
public class CampaignWinnerResource {

    private final Logger log = LoggerFactory.getLogger(CampaignWinnerResource.class);

    private static final String ENTITY_NAME = "campaignWinner";

    private final CampaignWinnerRepository campaignWinnerRepository;

    public CampaignWinnerResource(CampaignWinnerRepository campaignWinnerRepository) {
        this.campaignWinnerRepository = campaignWinnerRepository;
    }

    /**
     * POST  /campaign-winners : Create a new campaignWinner.
     *
     * @param campaignWinner the campaignWinner to create
     * @return the ResponseEntity with status 201 (Created) and with body the new campaignWinner, or with status 400 (Bad Request) if the campaignWinner has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/campaign-winners")
    @Timed
    public ResponseEntity<CampaignWinner> createCampaignWinner(@RequestBody CampaignWinner campaignWinner) throws URISyntaxException {
        log.debug("REST request to save CampaignWinner : {}", campaignWinner);
        if (campaignWinner.getId() != null) {
            throw new BadRequestAlertException("A new campaignWinner cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CampaignWinner result = campaignWinnerRepository.save(campaignWinner);
        return ResponseEntity.created(new URI("/api/campaign-winners/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /campaign-winners : Updates an existing campaignWinner.
     *
     * @param campaignWinner the campaignWinner to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated campaignWinner,
     * or with status 400 (Bad Request) if the campaignWinner is not valid,
     * or with status 500 (Internal Server Error) if the campaignWinner couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/campaign-winners")
    @Timed
    public ResponseEntity<CampaignWinner> updateCampaignWinner(@RequestBody CampaignWinner campaignWinner) throws URISyntaxException {
        log.debug("REST request to update CampaignWinner : {}", campaignWinner);
        if (campaignWinner.getId() == null) {
            return createCampaignWinner(campaignWinner);
        }
        CampaignWinner result = campaignWinnerRepository.save(campaignWinner);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, campaignWinner.getId().toString()))
            .body(result);
    }

    /**
     * GET  /campaign-winners : get all the campaignWinners.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of campaignWinners in body
     */
    @GetMapping("/campaign-winners")
    @Timed
    public List<CampaignWinner> getAllCampaignWinners() {
        log.debug("REST request to get all CampaignWinners");
        return campaignWinnerRepository.findAll();
        }

    /**
     * GET  /campaign-winners/:id : get the "id" campaignWinner.
     *
     * @param id the id of the campaignWinner to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the campaignWinner, or with status 404 (Not Found)
     */
    @GetMapping("/campaign-winners/{id}")
    @Timed
    public ResponseEntity<CampaignWinner> getCampaignWinner(@PathVariable Long id) {
        log.debug("REST request to get CampaignWinner : {}", id);
        CampaignWinner campaignWinner = campaignWinnerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(campaignWinner));
    }

    /**
     * DELETE  /campaign-winners/:id : delete the "id" campaignWinner.
     *
     * @param id the id of the campaignWinner to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/campaign-winners/{id}")
    @Timed
    public ResponseEntity<Void> deleteCampaignWinner(@PathVariable Long id) {
        log.debug("REST request to delete CampaignWinner : {}", id);
        campaignWinnerRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
