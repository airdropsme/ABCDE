package me.airdrops.abcdeapp.repository;

import me.airdrops.abcdeapp.domain.CampaignParticipant;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CampaignParticipant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CampaignParticipantRepository extends JpaRepository<CampaignParticipant, Long> {

}
