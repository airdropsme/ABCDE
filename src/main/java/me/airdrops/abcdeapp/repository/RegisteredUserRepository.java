package me.airdrops.abcdeapp.repository;

import me.airdrops.abcdeapp.domain.RegisteredUser;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RegisteredUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RegisteredUserRepository extends JpaRepository<RegisteredUser, Long> {

}
