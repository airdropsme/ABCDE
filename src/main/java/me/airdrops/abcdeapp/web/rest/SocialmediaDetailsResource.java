package me.airdrops.abcdeapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import me.airdrops.abcdeapp.domain.SocialmediaDetails;

import me.airdrops.abcdeapp.repository.SocialmediaDetailsRepository;
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
 * REST controller for managing SocialmediaDetails.
 */
@RestController
@RequestMapping("/api")
public class SocialmediaDetailsResource {

    private final Logger log = LoggerFactory.getLogger(SocialmediaDetailsResource.class);

    private static final String ENTITY_NAME = "socialmediaDetails";

    private final SocialmediaDetailsRepository socialmediaDetailsRepository;

    public SocialmediaDetailsResource(SocialmediaDetailsRepository socialmediaDetailsRepository) {
        this.socialmediaDetailsRepository = socialmediaDetailsRepository;
    }

    /**
     * POST  /socialmedia-details : Create a new socialmediaDetails.
     *
     * @param socialmediaDetails the socialmediaDetails to create
     * @return the ResponseEntity with status 201 (Created) and with body the new socialmediaDetails, or with status 400 (Bad Request) if the socialmediaDetails has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/socialmedia-details")
    @Timed
    public ResponseEntity<SocialmediaDetails> createSocialmediaDetails(@RequestBody SocialmediaDetails socialmediaDetails) throws URISyntaxException {
        log.debug("REST request to save SocialmediaDetails : {}", socialmediaDetails);
        if (socialmediaDetails.getId() != null) {
            throw new BadRequestAlertException("A new socialmediaDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SocialmediaDetails result = socialmediaDetailsRepository.save(socialmediaDetails);
        return ResponseEntity.created(new URI("/api/socialmedia-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /socialmedia-details : Updates an existing socialmediaDetails.
     *
     * @param socialmediaDetails the socialmediaDetails to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated socialmediaDetails,
     * or with status 400 (Bad Request) if the socialmediaDetails is not valid,
     * or with status 500 (Internal Server Error) if the socialmediaDetails couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/socialmedia-details")
    @Timed
    public ResponseEntity<SocialmediaDetails> updateSocialmediaDetails(@RequestBody SocialmediaDetails socialmediaDetails) throws URISyntaxException {
        log.debug("REST request to update SocialmediaDetails : {}", socialmediaDetails);
        if (socialmediaDetails.getId() == null) {
            return createSocialmediaDetails(socialmediaDetails);
        }
        SocialmediaDetails result = socialmediaDetailsRepository.save(socialmediaDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, socialmediaDetails.getId().toString()))
            .body(result);
    }

    /**
     * GET  /socialmedia-details : get all the socialmediaDetails.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of socialmediaDetails in body
     */
    @GetMapping("/socialmedia-details")
    @Timed
    public List<SocialmediaDetails> getAllSocialmediaDetails() {
        log.debug("REST request to get all SocialmediaDetails");
        return socialmediaDetailsRepository.findAll();
        }

    /**
     * GET  /socialmedia-details/:id : get the "id" socialmediaDetails.
     *
     * @param id the id of the socialmediaDetails to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the socialmediaDetails, or with status 404 (Not Found)
     */
    @GetMapping("/socialmedia-details/{id}")
    @Timed
    public ResponseEntity<SocialmediaDetails> getSocialmediaDetails(@PathVariable Long id) {
        log.debug("REST request to get SocialmediaDetails : {}", id);
        SocialmediaDetails socialmediaDetails = socialmediaDetailsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(socialmediaDetails));
    }

    /**
     * DELETE  /socialmedia-details/:id : delete the "id" socialmediaDetails.
     *
     * @param id the id of the socialmediaDetails to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/socialmedia-details/{id}")
    @Timed
    public ResponseEntity<Void> deleteSocialmediaDetails(@PathVariable Long id) {
        log.debug("REST request to delete SocialmediaDetails : {}", id);
        socialmediaDetailsRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
