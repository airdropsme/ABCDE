package me.airdrops.abcdeapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import me.airdrops.abcdeapp.domain.RegisteredUser;

import me.airdrops.abcdeapp.repository.RegisteredUserRepository;
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
 * REST controller for managing RegisteredUser.
 */
@RestController
@RequestMapping("/api")
public class RegisteredUserResource {

    private final Logger log = LoggerFactory.getLogger(RegisteredUserResource.class);

    private static final String ENTITY_NAME = "registeredUser";

    private final RegisteredUserRepository registeredUserRepository;

    public RegisteredUserResource(RegisteredUserRepository registeredUserRepository) {
        this.registeredUserRepository = registeredUserRepository;
    }

    /**
     * POST  /registered-users : Create a new registeredUser.
     *
     * @param registeredUser the registeredUser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new registeredUser, or with status 400 (Bad Request) if the registeredUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/registered-users")
    @Timed
    public ResponseEntity<RegisteredUser> createRegisteredUser(@RequestBody RegisteredUser registeredUser) throws URISyntaxException {
        log.debug("REST request to save RegisteredUser : {}", registeredUser);
        if (registeredUser.getId() != null) {
            throw new BadRequestAlertException("A new registeredUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RegisteredUser result = registeredUserRepository.save(registeredUser);
        return ResponseEntity.created(new URI("/api/registered-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /registered-users : Updates an existing registeredUser.
     *
     * @param registeredUser the registeredUser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated registeredUser,
     * or with status 400 (Bad Request) if the registeredUser is not valid,
     * or with status 500 (Internal Server Error) if the registeredUser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/registered-users")
    @Timed
    public ResponseEntity<RegisteredUser> updateRegisteredUser(@RequestBody RegisteredUser registeredUser) throws URISyntaxException {
        log.debug("REST request to update RegisteredUser : {}", registeredUser);
        if (registeredUser.getId() == null) {
            return createRegisteredUser(registeredUser);
        }
        RegisteredUser result = registeredUserRepository.save(registeredUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, registeredUser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /registered-users : get all the registeredUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of registeredUsers in body
     */
    @GetMapping("/registered-users")
    @Timed
    public List<RegisteredUser> getAllRegisteredUsers() {
        log.debug("REST request to get all RegisteredUsers");
        return registeredUserRepository.findAll();
        }

    /**
     * GET  /registered-users/:id : get the "id" registeredUser.
     *
     * @param id the id of the registeredUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the registeredUser, or with status 404 (Not Found)
     */
    @GetMapping("/registered-users/{id}")
    @Timed
    public ResponseEntity<RegisteredUser> getRegisteredUser(@PathVariable Long id) {
        log.debug("REST request to get RegisteredUser : {}", id);
        RegisteredUser registeredUser = registeredUserRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(registeredUser));
    }

    /**
     * DELETE  /registered-users/:id : delete the "id" registeredUser.
     *
     * @param id the id of the registeredUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/registered-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteRegisteredUser(@PathVariable Long id) {
        log.debug("REST request to delete RegisteredUser : {}", id);
        registeredUserRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
