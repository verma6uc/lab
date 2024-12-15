package ai.yuvi.modules.organization.model;

import java.time.ZonedDateTime;

import ai.yuvi.modules.organization.enums.Industry;

public class Company {
    private Long id;
    private String companyName;
    private String type;
    private String website;
    private String logoUrl;
    private Industry industry;
    private Integer size;
    private String description;
    private String contactEmail;
    private String contactPhone;
    private String contactAddress;
    private String linkedinUrl;
    private String twitterUrl;
    private String githubUrl;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public String getWebsite() {
        return website;
    }
    public void setWebsite(String website) {
        this.website = website;
    }

    public String getLogoUrl() {
        return logoUrl;
    }
    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public Industry getIndustry() {
        return industry;
    }
    public void setIndustry(Industry industry) {
        this.industry = industry;
    }

    public Integer getSize() {
        return size;
    }
    public void setSize(Integer size) {
        this.size = size;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getContactEmail() {
        return contactEmail;
    }
    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getContactPhone() {
        return contactPhone;
    }
    public void setContactPhone(String contactPhone) {
        this.contactPhone = contactPhone;
    }

    public String getContactAddress() {
        return contactAddress;
    }
    public void setContactAddress(String contactAddress) {
        this.contactAddress = contactAddress;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }
    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public String getTwitterUrl() {
        return twitterUrl;
    }
    public void setTwitterUrl(String twitterUrl) {
        this.twitterUrl = twitterUrl;
    }

    public String getGithubUrl() {
        return githubUrl;
    }
    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Compatibility methods for old code
    public String getName() {
        return getCompanyName();
    }
    public void setName(String name) {
        setCompanyName(name);
    }

    public String getEmail() {
        return getContactEmail();
    }
    public void setEmail(String email) {
        setContactEmail(email);
    }

    public String getPhone() {
        return getContactPhone();
    }
    public void setPhone(String phone) {
        setContactPhone(phone);
    }

    public String getLocation() {
        return getContactAddress();
    }
    public void setLocation(String location) {
        setContactAddress(location);
    }
}
