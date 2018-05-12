package me.airdrops.abcdeapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CampaignRewards.
 */
@Entity
@Table(name = "campaign_rewards")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CampaignRewards implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reward_type")
    private String rewardType;

    @Column(name = "reward_total")
    private Integer rewardTotal;

    @ManyToOne
    private CampaignDetails campaignDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRewardType() {
        return rewardType;
    }

    public CampaignRewards rewardType(String rewardType) {
        this.rewardType = rewardType;
        return this;
    }

    public void setRewardType(String rewardType) {
        this.rewardType = rewardType;
    }

    public Integer getRewardTotal() {
        return rewardTotal;
    }

    public CampaignRewards rewardTotal(Integer rewardTotal) {
        this.rewardTotal = rewardTotal;
        return this;
    }

    public void setRewardTotal(Integer rewardTotal) {
        this.rewardTotal = rewardTotal;
    }

    public CampaignDetails getCampaignDetails() {
        return campaignDetails;
    }

    public CampaignRewards campaignDetails(CampaignDetails campaignDetails) {
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
        CampaignRewards campaignRewards = (CampaignRewards) o;
        if (campaignRewards.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), campaignRewards.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CampaignRewards{" +
            "id=" + getId() +
            ", rewardType='" + getRewardType() + "'" +
            ", rewardTotal=" + getRewardTotal() +
            "}";
    }
}
