package me.airdrops.abcdeapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import me.airdrops.abcdeapp.domain.CampaignRewards;

import me.airdrops.abcdeapp.repository.CampaignRewardsRepository;
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
 * REST controller for managing CampaignRewards.
 */
@RestController
@RequestMapping("/api")
public class CampaignRewardsResource {

    private final Logger log = LoggerFactory.getLogger(CampaignRewardsResource.class);

    private static final String ENTITY_NAME = "campaignRewards";

    private final CampaignRewardsRepository campaignRewardsRepository;

    public CampaignRewardsResource(CampaignRewardsRepository campaignRewardsRepository) {
        this.campaignRewardsRepository = campaignRewardsRepository;
    }

    /**
     * POST  /campaign-rewards : Create a new campaignRewards.
     *
     * @param campaignRewards the campaignRewards to create
     * @return the ResponseEntity with status 201 (Created) and with body the new campaignRewards, or with status 400 (Bad Request) if the campaignRewards has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/campaign-rewards")
    @Timed
    public ResponseEntity<CampaignRewards> createCampaignRewards(@RequestBody CampaignRewards campaignRewards) throws URISyntaxException {
        log.debug("REST request to save CampaignRewards : {}", campaignRewards);
        if (campaignRewards.getId() != null) {
            throw new BadRequestAlertException("A new campaignRewards cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CampaignRewards result = campaignRewardsRepository.save(campaignRewards);
        return ResponseEntity.created(new URI("/api/campaign-rewards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /campaign-rewards : Updates an existing campaignRewards.
     *
     * @param campaignRewards the campaignRewards to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated campaignRewards,
     * or with status 400 (Bad Request) if the campaignRewards is not valid,
     * or with status 500 (Internal Server Error) if the campaignRewards couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/campaign-rewards")
    @Timed
    public ResponseEntity<CampaignRewards> updateCampaignRewards(@RequestBody CampaignRewards campaignRewards) throws URISyntaxException {
        log.debug("REST request to update CampaignRewards : {}", campaignRewards);
        if (campaignRewards.getId() == null) {
            return createCampaignRewards(campaignRewards);
        }
        CampaignRewards result = campaignRewardsRepository.save(campaignRewards);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, campaignRewards.getId().toString()))
            .body(result);
    }

    /**
     * GET  /campaign-rewards : get all the campaignRewards.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of campaignRewards in body
     */
    @GetMapping("/campaign-rewards")
    @Timed
    public List<CampaignRewards> getAllCampaignRewards() {
        log.debug("REST request to get all CampaignRewards");
        return campaignRewardsRepository.findAll();
        }

    /**
     * GET  /campaign-rewards/:id : get the "id" campaignRewards.
     *
     * @param id the id of the campaignRewards to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the campaignRewards, or with status 404 (Not Found)
     */
    @GetMapping("/campaign-rewards/{id}")
    @Timed
    public ResponseEntity<CampaignRewards> getCampaignRewards(@PathVariable Long id) {
        log.debug("REST request to get CampaignRewards : {}", id);
        CampaignRewards campaignRewards = campaignRewardsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(campaignRewards));
    }

    /**
     * DELETE  /campaign-rewards/:id : delete the "id" campaignRewards.
     *
     * @param id the id of the campaignRewards to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/campaign-rewards/{id}")
    @Timed
    public ResponseEntity<Void> deleteCampaignRewards(@PathVariable Long id) {
        log.debug("REST request to delete CampaignRewards : {}", id);
        campaignRewardsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
