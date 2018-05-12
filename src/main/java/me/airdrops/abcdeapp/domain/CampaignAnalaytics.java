package me.airdrops.abcdeapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CampaignAnalaytics.
 */
@Entity
@Table(name = "campaign_analaytics")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CampaignAnalaytics implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "views")
    private Integer views;

    @Column(name = "referral_count")
    private Integer referralCount;

    @ManyToOne
    private CampaignDetails campaignDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getViews() {
        return views;
    }

    public CampaignAnalaytics views(Integer views) {
        this.views = views;
        return this;
    }

    public void setViews(Integer views) {
        this.views = views;
    }

    public Integer getReferralCount() {
        return referralCount;
    }

    public CampaignAnalaytics referralCount(Integer referralCount) {
        this.referralCount = referralCount;
        return this;
    }

    public void setReferralCount(Integer referralCount) {
        this.referralCount = referralCount;
    }

    public CampaignDetails getCampaignDetails() {
        return campaignDetails;
    }

    public CampaignAnalaytics campaignDetails(CampaignDetails campaignDetails) {
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
        CampaignAnalaytics campaignAnalaytics = (CampaignAnalaytics) o;
        if (campaignAnalaytics.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), campaignAnalaytics.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CampaignAnalaytics{" +
            "id=" + getId() +
            ", views=" + getViews() +
            ", referralCount=" + getReferralCount() +
            "}";
    }
}
