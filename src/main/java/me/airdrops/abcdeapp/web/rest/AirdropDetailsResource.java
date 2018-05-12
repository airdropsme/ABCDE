package me.airdrops.abcdeapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import me.airdrops.abcdeapp.domain.AirdropDetails;

import me.airdrops.abcdeapp.repository.AirdropDetailsRepository;
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
 * REST controller for managing AirdropDetails.
 */
@RestController
@RequestMapping("/api")
public class AirdropDetailsResource {

    private final Logger log = LoggerFactory.getLogger(AirdropDetailsResource.class);

    private static final String ENTITY_NAME = "airdropDetails";

    private final AirdropDetailsRepository airdropDetailsRepository;

    public AirdropDetailsResource(AirdropDetailsRepository airdropDetailsRepository) {
        this.airdropDetailsRepository = airdropDetailsRepository;
    }

    /**
     * POST  /airdrop-details : Create a new airdropDetails.
     *
     * @param airdropDetails the airdropDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new airdropDetails, or with status 400 (Bad Request) if the airdropDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/airdrop-details")
    @Timed
    public ResponseEntity<AirdropDetails> createAirdropDetails(@RequestBody AirdropDetails airdropDetails) throws URISyntaxException {
        log.debug("REST request to save AirdropDetails : {}", airdropDetails);
        if (airdropDetails.getId() != null) {
            throw new BadRequestAlertException("A new airdropDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AirdropDetails result = airdropDetailsRepository.save(airdropDetails);
        return ResponseEntity.created(new URI("/api/airdrop-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /airdrop-details : Updates an existing airdropDetails.
     *
     * @param airdropDetails the airdropDetails to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated airdropDetails,
     * or with status 400 (Bad Request) if the airdropDetails is not valid,
     * or with status 500 (Internal Server Error) if the airdropDetails couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/airdrop-details")
    @Timed
    public ResponseEntity<AirdropDetails> updateAirdropDetails(@RequestBody AirdropDetails airdropDetails) throws URISyntaxException {
        log.debug("REST request to update AirdropDetails : {}", airdropDetails);
        if (airdropDetails.getId() == null) {
            return createAirdropDetails(airdropDetails);
        }
        AirdropDetails result = airdropDetailsRepository.save(airdropDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, airdropDetails.getId().toString()))
            .body(result);
    }

    /**
     * GET  /airdrop-details : get all the airdropDetails.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of airdropDetails in body
     */
    @GetMapping("/airdrop-details")
    @Timed
    public List<AirdropDetails> getAllAirdropDetails() {
        log.debug("REST request to get all AirdropDetails");
        return airdropDetailsRepository.findAll();
        }

    /**
     * GET  /airdrop-details/:id : get the "id" airdropDetails.
     *
     * @param id the id of the airdropDetails to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the airdropDetails, or with status 404 (Not Found)
     */
    @GetMapping("/airdrop-details/{id}")
    @Timed
    public ResponseEntity<AirdropDetails> getAirdropDetails(@PathVariable Long id) {
        log.debug("REST request to get AirdropDetails : {}", id);
        AirdropDetails airdropDetails = airdropDetailsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(airdropDetails));
    }

    /**
     * DELETE  /airdrop-details/:id : delete the "id" airdropDetails.
     *
     * @param id the id of the airdropDetails to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/airdrop-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteAirdropDetails(@PathVariable Long id) {
        log.debug("REST request to delete AirdropDetails : {}", id);
        airdropDetailsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
