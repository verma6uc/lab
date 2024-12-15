package ai.yuvi.modules.research.model;

import java.time.ZonedDateTime;

import ai.yuvi.modules.research.enums.CompetitorStatus;

public class Competitor {
    private Long id;
    private Long companyId;
    private String name;
    private String type;
    private CompetitorStatus status;
    private String description;
    private String strengthsWeaknesses;
    private String marketShare;
    private String targetMarket;
    private Double revenue;
    private String currency;
    private String employeeCount;
    private String location;
    private String founded;
    private String logoUrl;
    private String website;
    private String productUrl;
    private String pricingUrl;
    private String notes;
    private ZonedDateTime lastUpdated;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getCompanyId() {
        return companyId;
    }
    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public CompetitorStatus getStatus() {
        return status;
    }
    public void setStatus(CompetitorStatus status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getStrengthsWeaknesses() {
        return strengthsWeaknesses;
    }
    public void setStrengthsWeaknesses(String strengthsWeaknesses) {
        this.strengthsWeaknesses = strengthsWeaknesses;
    }

    public String getMarketShare() {
        return marketShare;
    }
    public void setMarketShare(String marketShare) {
        this.marketShare = marketShare;
    }

    public String getTargetMarket() {
        return targetMarket;
    }
    public void setTargetMarket(String targetMarket) {
        this.targetMarket = targetMarket;
    }

    public Double getRevenue() {
        return revenue;
    }
    public void setRevenue(Double revenue) {
        this.revenue = revenue;
    }

    public String getCurrency() {
        return currency;
    }
    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getEmployeeCount() {
        return employeeCount;
    }
    public void setEmployeeCount(String employeeCount) {
        this.employeeCount = employeeCount;
    }

    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }

    public String getFounded() {
        return founded;
    }
    public void setFounded(String founded) {
        this.founded = founded;
    }

    public String getLogoUrl() {
        return logoUrl;
    }
    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getWebsite() {
        return website;
    }
    public void setWebsite(String website) {
        this.website = website;
    }

    public String getProductUrl() {
        return productUrl;
    }
    public void setProductUrl(String productUrl) {
        this.productUrl = productUrl;
    }

    public String getPricingUrl() {
        return pricingUrl;
    }
    public void setPricingUrl(String pricingUrl) {
        this.pricingUrl = pricingUrl;
    }

    public String getNotes() {
        return notes;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }

    public ZonedDateTime getLastUpdated() {
        return lastUpdated;
    }
    public void setLastUpdated(ZonedDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
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
}
