package me.airdrops.abcdeapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A EmailProvider.
 */
@Entity
@Table(name = "email_provider")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class EmailProvider implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "connected")
    private String connected;

    @Column(name = "api_key")
    private String apiKey;

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

    public EmailProvider name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getConnected() {
        return connected;
    }

    public EmailProvider connected(String connected) {
        this.connected = connected;
        return this;
    }

    public void setConnected(String connected) {
        this.connected = connected;
    }

    public String getApiKey() {
        return apiKey;
    }

    public EmailProvider apiKey(String apiKey) {
        this.apiKey = apiKey;
        return this;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public CampaignDetails getCampaignDetails() {
        return campaignDetails;
    }

    public EmailProvider campaignDetails(CampaignDetails campaignDetails) {
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
        EmailProvider emailProvider = (EmailProvider) o;
        if (emailProvider.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), emailProvider.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EmailProvider{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", connected='" + getConnected() + "'" +
            ", apiKey='" + getApiKey() + "'" +
            "}";
    }
}
