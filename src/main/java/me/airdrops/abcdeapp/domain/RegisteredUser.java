package me.airdrops.abcdeapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A RegisteredUser.
 */
@Entity
@Table(name = "registered_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RegisteredUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "join_date")
    private LocalDate joinDate;

    @Column(name = "account_plan")
    private String accountPlan;

    @Column(name = "email")
    private String email;

    @Column(name = "email_verified")
    private Boolean emailVerified;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getJoinDate() {
        return joinDate;
    }

    public RegisteredUser joinDate(LocalDate joinDate) {
        this.joinDate = joinDate;
        return this;
    }

    public void setJoinDate(LocalDate joinDate) {
        this.joinDate = joinDate;
    }

    public String getAccountPlan() {
        return accountPlan;
    }

    public RegisteredUser accountPlan(String accountPlan) {
        this.accountPlan = accountPlan;
        return this;
    }

    public void setAccountPlan(String accountPlan) {
        this.accountPlan = accountPlan;
    }

    public String getEmail() {
        return email;
    }

    public RegisteredUser email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean isEmailVerified() {
        return emailVerified;
    }

    public RegisteredUser emailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
        return this;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
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
        RegisteredUser registeredUser = (RegisteredUser) o;
        if (registeredUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), registeredUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RegisteredUser{" +
            "id=" + getId() +
            ", joinDate='" + getJoinDate() + "'" +
            ", accountPlan='" + getAccountPlan() + "'" +
            ", email='" + getEmail() + "'" +
            ", emailVerified='" + isEmailVerified() + "'" +
            "}";
    }
}
