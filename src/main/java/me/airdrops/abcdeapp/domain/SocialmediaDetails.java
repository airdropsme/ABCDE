package me.airdrops.abcdeapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SocialmediaDetails.
 */
@Entity
@Table(name = "socialmedia_details")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SocialmediaDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "facebook")
    private String facebook;

    @Column(name = "twitter")
    private String twitter;

    @Column(name = "pinterest")
    private String pinterest;

    @Column(name = "youtube")
    private String youtube;

    @ManyToOne
    private CampaignDetails campaignDetails;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFacebook() {
        return facebook;
    }

    public SocialmediaDetails facebook(String facebook) {
        this.facebook = facebook;
        return this;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getTwitter() {
        return twitter;
    }

    public SocialmediaDetails twitter(String twitter) {
        this.twitter = twitter;
        return this;
    }

    public void setTwitter(String twitter) {
        this.twitter = twitter;
    }

    public String getPinterest() {
        return pinterest;
    }

    public SocialmediaDetails pinterest(String pinterest) {
        this.pinterest = pinterest;
        return this;
    }

    public void setPinterest(String pinterest) {
        this.pinterest = pinterest;
    }

    public String getYoutube() {
        return youtube;
    }

    public SocialmediaDetails youtube(String youtube) {
        this.youtube = youtube;
        return this;
    }

    public void setYoutube(String youtube) {
        this.youtube = youtube;
    }

    public CampaignDetails getCampaignDetails() {
        return campaignDetails;
    }

    public SocialmediaDetails campaignDetails(CampaignDetails campaignDetails) {
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
        SocialmediaDetails socialmediaDetails = (SocialmediaDetails) o;
        if (socialmediaDetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), socialmediaDetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SocialmediaDetails{" +
            "id=" + getId() +
            ", facebook='" + getFacebook() + "'" +
            ", twitter='" + getTwitter() + "'" +
            ", pinterest='" + getPinterest() + "'" +
            ", youtube='" + getYoutube() + "'" +
            "}";
    }
}
