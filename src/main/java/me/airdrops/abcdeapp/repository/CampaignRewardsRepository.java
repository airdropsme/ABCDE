package me.airdrops.abcdeapp.repository;

import me.airdrops.abcdeapp.domain.CampaignRewards;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CampaignRewards entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CampaignRewardsRepository extends JpaRepository<CampaignRewards, Long> {

}
