package me.airdrops.abcdeapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A CampaignDetails.
 */
@Entity
@Table(name = "campaign_details")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CampaignDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "status")
    private String status;

    @Column(name = "campaign_type")
    private String campaignType;

    @Column(name = "campaign_page_url")
    private String campaignPageUrl;

    @Column(name = "prize_value")
    private Integer prizeValue;

    @Column(name = "terms")
    private String terms;

    @Column(name = "startdate")
    private LocalDate startdate;

    @Column(name = "enddate")
    private LocalDate enddate;

    @OneToOne
    @JoinColumn(unique = true)
    private AirdropDetails airdropDetails;

    @OneToOne
    @JoinColumn(unique = true)
    private RegisteredUser registeredUser;

    @OneToMany(mappedBy = "campaignDetails")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CampaignAnalaytics> campaignanAlaytics = new HashSet<>();

    @OneToMany(mappedBy = "campaignDetails")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CampaignParticipant> campaignParticipants = new HashSet<>();

    @OneToMany(mappedBy = "campaignDetails")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SocialmediaDetails> socialmediaDetails = new HashSet<>();

    @OneToMany(mappedBy = "campaignDetails")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CampaignWinner> campaignWinners = new HashSet<>();

    @OneToMany(mappedBy = "campaignDetails")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EmailProvider> emailProviders = new HashSet<>();

    @OneToMany(mappedBy = "campaignDetails")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CampaignRewards> campaignRewards = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public CampaignDetails title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public CampaignDetails status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCampaignType() {
        return campaignType;
    }

    public CampaignDetails campaignType(String campaignType) {
        this.campaignType = campaignType;
        return this;
    }

    public void setCampaignType(String campaignType) {
        this.campaignType = campaignType;
    }

    public String getCampaignPageUrl() {
        return campaignPageUrl;
    }

    public CampaignDetails campaignPageUrl(String campaignPageUrl) {
        this.campaignPageUrl = campaignPageUrl;
        return this;
    }

    public void setCampaignPageUrl(String campaignPageUrl) {
        this.campaignPageUrl = campaignPageUrl;
    }

    public Integer getPrizeValue() {
        return prizeValue;
    }

    public CampaignDetails prizeValue(Integer prizeValue) {
        this.prizeValue = prizeValue;
        return this;
    }

    public void setPrizeValue(Integer prizeValue) {
        this.prizeValue = prizeValue;
    }

    public String getTerms() {
        return terms;
    }

    public CampaignDetails terms(String terms) {
        this.terms = terms;
        return this;
    }

    public void setTerms(String terms) {
        this.terms = terms;
    }

    public LocalDate getStartdate() {
        return startdate;
    }

    public CampaignDetails startdate(LocalDate startdate) {
        this.startdate = startdate;
        return this;
    }

    public void setStartdate(LocalDate startdate) {
        this.startdate = startdate;
    }

    public LocalDate getEnddate() {
        return enddate;
    }

    public CampaignDetails enddate(LocalDate enddate) {
        this.enddate = enddate;
        return this;
    }

    public void setEnddate(LocalDate enddate) {
        this.enddate = enddate;
    }

    public AirdropDetails getAirdropDetails() {
        return airdropDetails;
    }

    public CampaignDetails airdropDetails(AirdropDetails airdropDetails) {
        this.airdropDetails = airdropDetails;
        return this;
    }

    public void setAirdropDetails(AirdropDetails airdropDetails) {
        this.airdropDetails = airdropDetails;
    }

    public RegisteredUser getRegisteredUser() {
        return registeredUser;
    }

    public CampaignDetails registeredUser(RegisteredUser registeredUser) {
        this.registeredUser = registeredUser;
        return this;
    }

    public void setRegisteredUser(RegisteredUser registeredUser) {
        this.registeredUser = registeredUser;
    }

    public Set<CampaignAnalaytics> getCampaignanAlaytics() {
        return campaignanAlaytics;
    }

    public CampaignDetails campaignanAlaytics(Set<CampaignAnalaytics> campaignAnalaytics) {
        this.campaignanAlaytics = campaignAnalaytics;
        return this;
    }

    public CampaignDetails addCampaignanAlaytics(CampaignAnalaytics campaignAnalaytics) {
        this.campaignanAlaytics.add(campaignAnalaytics);
        campaignAnalaytics.setCampaignDetails(this);
        return this;
    }

    public CampaignDetails removeCampaignanAlaytics(CampaignAnalaytics campaignAnalaytics) {
        this.campaignanAlaytics.remove(campaignAnalaytics);
        campaignAnalaytics.setCampaignDetails(null);
        return this;
    }

    public void setCampaignanAlaytics(Set<CampaignAnalaytics> campaignAnalaytics) {
        this.campaignanAlaytics = campaignAnalaytics;
    }

    public Set<CampaignParticipant> getCampaignParticipants() {
        return campaignParticipants;
    }

    public CampaignDetails campaignParticipants(Set<CampaignParticipant> campaignParticipants) {
        this.campaignParticipants = campaignParticipants;
        return this;
    }

    public CampaignDetails addCampaignParticipant(CampaignParticipant campaignParticipant) {
        this.campaignParticipants.add(campaignParticipant);
        campaignParticipant.setCampaignDetails(this);
        return this;
    }

    public CampaignDetails removeCampaignParticipant(CampaignParticipant campaignParticipant) {
        this.campaignParticipants.remove(campaignParticipant);
        campaignParticipant.setCampaignDetails(null);
        return this;
    }

    public void setCampaignParticipants(Set<CampaignParticipant> campaignParticipants) {
        this.campaignParticipants = campaignParticipants;
    }

    public Set<SocialmediaDetails> getSocialmediaDetails() {
        return socialmediaDetails;
    }

    public CampaignDetails socialmediaDetails(Set<SocialmediaDetails> socialmediaDetails) {
        this.socialmediaDetails = socialmediaDetails;
        return this;
    }

    public CampaignDetails addSocialmediaDetails(SocialmediaDetails socialmediaDetails) {
        this.socialmediaDetails.add(socialmediaDetails);
        socialmediaDetails.setCampaignDetails(this);
        return this;
    }

    public CampaignDetails removeSocialmediaDetails(SocialmediaDetails socialmediaDetails) {
        this.socialmediaDetails.remove(socialmediaDetails);
        socialmediaDetails.setCampaignDetails(null);
        return this;
    }

    public void setSocialmediaDetails(Set<SocialmediaDetails> socialmediaDetails) {
        this.socialmediaDetails = socialmediaDetails;
    }

    public Set<CampaignWinner> getCampaignWinners() {
        return campaignWinners;
    }

    public CampaignDetails campaignWinners(Set<CampaignWinner> campaignWinners) {
        this.campaignWinners = campaignWinners;
        return this;
    }

    public CampaignDetails addCampaignWinner(CampaignWinner campaignWinner) {
        this.campaignWinners.add(campaignWinner);
        campaignWinner.setCampaignDetails(this);
        return this;
    }

    public CampaignDetails removeCampaignWinner(CampaignWinner campaignWinner) {
        this.campaignWinners.remove(campaignWinner);
        campaignWinner.setCampaignDetails(null);
        return this;
    }

    public void setCampaignWinners(Set<CampaignWinner> campaignWinners) {
        this.campaignWinners = campaignWinners;
    }

    public Set<EmailProvider> getEmailProviders() {
        return emailProviders;
    }

    public CampaignDetails emailProviders(Set<EmailProvider> emailProviders) {
        this.emailProviders = emailProviders;
        return this;
    }

    public CampaignDetails addEmailProvider(EmailProvider emailProvider) {
        this.emailProviders.add(emailProvider);
        emailProvider.setCampaignDetails(this);
        return this;
    }

    public CampaignDetails removeEmailProvider(EmailProvider emailProvider) {
        this.emailProviders.remove(emailProvider);
        emailProvider.setCampaignDetails(null);
        return this;
    }

    public void setEmailProviders(Set<EmailProvider> emailProviders) {
        this.emailProviders = emailProviders;
    }

    public Set<CampaignRewards> getCampaignRewards() {
        return campaignRewards;
    }

    public CampaignDetails campaignRewards(Set<CampaignRewards> campaignRewards) {
        this.campaignRewards = campaignRewards;
        return this;
    }

    public CampaignDetails addCampaignRewards(CampaignRewards campaignRewards) {
        this.campaignRewards.add(campaignRewards);
        campaignRewards.setCampaignDetails(this);
        return this;
    }

    public CampaignDetails removeCampaignRewards(CampaignRewards campaignRewards) {
        this.campaignRewards.remove(campaignRewards);
        campaignRewards.setCampaignDetails(null);
        return this;
    }

    public void setCampaignRewards(Set<CampaignRewards> campaignRewards) {
        this.campaignRewards = campaignRewards;
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
        CampaignDetails campaignDetails = (CampaignDetails) o;
        if (campaignDetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), campaignDetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CampaignDetails{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", status='" + getStatus() + "'" +
            ", campaignType='" + getCampaignType() + "'" +
            ", campaignPageUrl='" + getCampaignPageUrl() + "'" +
            ", prizeValue=" + getPrizeValue() +
            ", terms='" + getTerms() + "'" +
            ", startdate='" + getStartdate() + "'" +
            ", enddate='" + getEnddate() + "'" +
            "}";
    }
}
