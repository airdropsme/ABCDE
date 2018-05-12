package me.airdrops.abcdeapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import me.airdrops.abcdeapp.domain.EmailProvider;

import me.airdrops.abcdeapp.repository.EmailProviderRepository;
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
 * REST controller for managing EmailProvider.
 */
@RestController
@RequestMapping("/api")
public class EmailProviderResource {

    private final Logger log = LoggerFactory.getLogger(EmailProviderResource.class);

    private static final String ENTITY_NAME = "emailProvider";

    private final EmailProviderRepository emailProviderRepository;

    public EmailProviderResource(EmailProviderRepository emailProviderRepository) {
        this.emailProviderRepository = emailProviderRepository;
    }

    /**
     * POST  /email-providers : Create a new emailProvider.
     *
     * @param emailProvider the emailProvider to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emailProvider, or with status 400 (Bad Request) if the emailProvider has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/email-providers")
    @Timed
    public ResponseEntity<EmailProvider> createEmailProvider(@RequestBody EmailProvider emailProvider) throws URISyntaxException {
        log.debug("REST request to save EmailProvider : {}", emailProvider);
        if (emailProvider.getId() != null) {
            throw new BadRequestAlertException("A new emailProvider cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmailProvider result = emailProviderRepository.save(emailProvider);
        return ResponseEntity.created(new URI("/api/email-providers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /email-providers : Updates an existing emailProvider.
     *
     * @param emailProvider the emailProvider to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emailProvider,
     * or with status 400 (Bad Request) if the emailProvider is not valid,
     * or with status 500 (Internal Server Error) if the emailProvider couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/email-providers")
    @Timed
    public ResponseEntity<EmailProvider> updateEmailProvider(@RequestBody EmailProvider emailProvider) throws URISyntaxException {
        log.debug("REST request to update EmailProvider : {}", emailProvider);
        if (emailProvider.getId() == null) {
            return createEmailProvider(emailProvider);
        }
        EmailProvider result = emailProviderRepository.save(emailProvider);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emailProvider.getId().toString()))
            .body(result);
    }

    /**
     * GET  /email-providers : get all the emailProviders.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of emailProviders in body
     */
    @GetMapping("/email-providers")
    @Timed
    public List<EmailProvider> getAllEmailProviders() {
        log.debug("REST request to get all EmailProviders");
        return emailProviderRepository.findAll();
        }

    /**
     * GET  /email-providers/:id : get the "id" emailProvider.
     *
     * @param id the id of the emailProvider to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emailProvider, or with status 404 (Not Found)
     */
    @GetMapping("/email-providers/{id}")
    @Timed
    public ResponseEntity<EmailProvider> getEmailProvider(@PathVariable Long id) {
        log.debug("REST request to get EmailProvider : {}", id);
        EmailProvider emailProvider = emailProviderRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emailProvider));
    }

    /**
     * DELETE  /email-providers/:id : delete the "id" emailProvider.
     *
     * @param id the id of the emailProvider to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/email-providers/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmailProvider(@PathVariable Long id) {
        log.debug("REST request to delete EmailProvider : {}", id);
        emailProviderRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
