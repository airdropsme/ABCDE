package me.airdrops.abcdeapp.repository;

import me.airdrops.abcdeapp.domain.CampaignWinner;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CampaignWinner entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CampaignWinnerRepository extends JpaRepository<CampaignWinner, Long> {

}
