package me.airdrops.abcdeapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import me.airdrops.abcdeapp.domain.CampaignParticipant;

import me.airdrops.abcdeapp.repository.CampaignParticipantRepository;
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
 * REST controller for managing CampaignParticipant.
 */
@RestController
@RequestMapping("/api")
public class CampaignParticipantResource {

    private final Logger log = LoggerFactory.getLogger(CampaignParticipantResource.class);

    private static final String ENTITY_NAME = "campaignParticipant";

    private final CampaignParticipantRepository campaignParticipantRepository;

    public CampaignParticipantResource(CampaignParticipantRepository campaignParticipantRepository) {
        this.campaignParticipantRepository = campaignParticipantRepository;
    }

    /**
     * POST  /campaign-participants : Create a new campaignParticipant.
     *
     * @param campaignParticipant the campaignParticipant to create
     * @return the ResponseEntity with status 201 (Created) and with body the new campaignParticipant, or with status 400 (Bad Request) if the campaignParticipant has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/campaign-participants")
    @Timed
    public ResponseEntity<CampaignParticipant> createCampaignParticipant(@RequestBody CampaignParticipant campaignParticipant) throws URISyntaxException {
        log.debug("REST request to save CampaignParticipant : {}", campaignParticipant);
        if (campaignParticipant.getId() != null) {
            throw new BadRequestAlertException("A new campaignParticipant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CampaignParticipant result = campaignParticipantRepository.save(campaignParticipant);
        return ResponseEntity.created(new URI("/api/campaign-participants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /campaign-participants : Updates an existing campaignParticipant.
     *
     * @param campaignParticipant the campaignParticipant to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated campaignParticipant,
     * or with status 400 (Bad Request) if the campaignParticipant is not valid,
     * or with status 500 (Internal Server Error) if the campaignParticipant couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/campaign-participants")
    @Timed
    public ResponseEntity<CampaignParticipant> updateCampaignParticipant(@RequestBody CampaignParticipant campaignParticipant) throws URISyntaxException {
        log.debug("REST request to update CampaignParticipant : {}", campaignParticipant);
        if (campaignParticipant.getId() == null) {
            return createCampaignParticipant(campaignParticipant);
        }
        CampaignParticipant result = campaignParticipantRepository.save(campaignParticipant);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, campaignParticipant.getId().toString()))
            .body(result);
    }

    /**
     * GET  /campaign-participants : get all the campaignParticipants.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of campaignParticipants in body
     */
    @GetMapping("/campaign-participants")
    @Timed
    public List<CampaignParticipant> getAllCampaignParticipants() {
        log.debug("REST request to get all CampaignParticipants");
        return campaignParticipantRepository.findAll();
        }

    /**
     * GET  /campaign-participants/:id : get the "id" campaignParticipant.
     *
     * @param id the id of the campaignParticipant to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the campaignParticipant, or with status 404 (Not Found)
     */
    @GetMapping("/campaign-participants/{id}")
    @Timed
    public ResponseEntity<CampaignParticipant> getCampaignParticipant(@PathVariable Long id) {
        log.debug("REST request to get CampaignParticipant : {}", id);
        CampaignParticipant campaignParticipant = campaignParticipantRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(campaignParticipant));
    }

    /**
     * DELETE  /campaign-participants/:id : delete the "id" campaignParticipant.
     *
     * @param id the id of the campaignParticipant to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/campaign-participants/{id}")
    @Timed
    public ResponseEntity<Void> deleteCampaignParticipant(@PathVariable Long id) {
        log.debug("REST request to delete CampaignParticipant : {}", id);
        campaignParticipantRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
