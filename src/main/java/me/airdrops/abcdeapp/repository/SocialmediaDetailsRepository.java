package me.airdrops.abcdeapp.repository;

import me.airdrops.abcdeapp.domain.SocialmediaDetails;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SocialmediaDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SocialmediaDetailsRepository extends JpaRepository<SocialmediaDetails, Long> {

}
