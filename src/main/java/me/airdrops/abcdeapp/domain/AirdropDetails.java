package me.airdrops.abcdeapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A AirdropDetails.
 */
@Entity
@Table(name = "airdrop_details")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AirdropDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "currency_name")
    private String currencyName;

    @Column(name = "currency_type")
    private String currencyType;

    @Column(name = "contract_address")
    private String contractAddress;

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

    public AirdropDetails title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCurrencyName() {
        return currencyName;
    }

    public AirdropDetails currencyName(String currencyName) {
        this.currencyName = currencyName;
        return this;
    }

    public void setCurrencyName(String currencyName) {
        this.currencyName = currencyName;
    }

    public String getCurrencyType() {
        return currencyType;
    }

    public AirdropDetails currencyType(String currencyType) {
        this.currencyType = currencyType;
        return this;
    }

    public void setCurrencyType(String currencyType) {
        this.currencyType = currencyType;
    }

    public String getContractAddress() {
        return contractAddress;
    }

    public AirdropDetails contractAddress(String contractAddress) {
        this.contractAddress = contractAddress;
        return this;
    }

    public void setContractAddress(String contractAddress) {
        this.contractAddress = contractAddress;
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
        AirdropDetails airdropDetails = (AirdropDetails) o;
        if (airdropDetails.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), airdropDetails.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AirdropDetails{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", currencyName='" + getCurrencyName() + "'" +
            ", currencyType='" + getCurrencyType() + "'" +
            ", contractAddress='" + getContractAddress() + "'" +
            "}";
    }
}
