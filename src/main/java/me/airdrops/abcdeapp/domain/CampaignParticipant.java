package me.airdrops.abcdeapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CampaignParticipant.
 */
@Entity
@Table(name = "campaign_participant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CampaignParticipant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "unique_url")
    private String uniqueURL;

    @Column(name = "points")
    private Integer points;

    @ManyToOne
    private CampaignDetails campaignDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public CampaignParticipant name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public CampaignParticipant email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUniqueURL() {
        return uniqueURL;
    }

    public CampaignParticipant uniqueURL(String uniqueURL) {
        this.uniqueURL = uniqueURL;
        return this;
    }

    public void setUniqueURL(String uniqueURL) {
        this.uniqueURL = uniqueURL;
    }

    public Integer getPoints() {
        return points;
    }

    public CampaignParticipant points(Integer points) {
        this.points = points;
        return this;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public CampaignDetails getCampaignDetails() {
        return campaignDetails;
    }

    public CampaignParticipant campaignDetails(CampaignDetails campaignDetails) {
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
        CampaignParticipant campaignParticipant = (CampaignParticipant) o;
        if (campaignParticipant.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), campaignParticipant.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CampaignParticipant{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", uniqueURL='" + getUniqueURL() + "'" +
            ", points=" + getPoints() +
            "}";
    }
}
