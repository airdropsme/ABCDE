package me.airdrops.abcdeapp.repository;

import me.airdrops.abcdeapp.domain.CampaignAnalaytics;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CampaignAnalaytics entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CampaignAnalayticsRepository extends JpaRepository<CampaignAnalaytics, Long> {

}
