package me.airdrops.abcdeapp.repository;

import me.airdrops.abcdeapp.domain.AirdropDetails;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AirdropDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AirdropDetailsRepository extends JpaRepository<AirdropDetails, Long> {

}
