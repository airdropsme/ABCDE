package me.airdrops.abcdeapp.repository;

import me.airdrops.abcdeapp.domain.CampaignDetails;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CampaignDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CampaignDetailsRepository extends JpaRepository<CampaignDetails, Long> {

}
