package me.airdrops.abcdeapp.repository;

import me.airdrops.abcdeapp.domain.EmailProvider;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EmailProvider entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmailProviderRepository extends JpaRepository<EmailProvider, Long> {

}
