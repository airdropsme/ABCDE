package me.airdrops.abcdeapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CampaignWinner.
 */
@Entity
@Table(name = "campaign_winner")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CampaignWinner implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "winner_id")
    private String winnerId;

    @Column(name = "winner_prize")
    private String winnerPrize;

    @ManyToOne
    private CampaignDetails campaignDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWinnerId() {
        return winnerId;
    }

    public CampaignWinner winnerId(String winnerId) {
        this.winnerId = winnerId;
        return this;
    }

    public void setWinnerId(String winnerId) {
        this.winnerId = winnerId;
    }

    public String getWinnerPrize() {
        return winnerPrize;
    }

    public CampaignWinner winnerPrize(String winnerPrize) {
        this.winnerPrize = winnerPrize;
        return this;
    }

    public void setWinnerPrize(String winnerPrize) {
        this.winnerPrize = winnerPrize;
    }

    public CampaignDetails getCampaignDetails() {
        return campaignDetails;
    }

    public CampaignWinner campaignDetails(CampaignDetails campaignDetails) {
        this.campaignDetails = campaignDetails;
        return this;
    }

    public void setCampaignDetails(CampaignDetails campaignDetails) {
        this.campaignDetails = campaignDetails;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CampaignWinner campaignWinner = (CampaignWinner) o;
        if (campaignWinner.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), campaignWinner.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CampaignWinner{" +
            "id=" + getId() +
            ", winnerId='" + getWinnerId() + "'" +
            ", winnerPrize='" + getWinnerPrize() + "'" +
            "}";
    }
}
