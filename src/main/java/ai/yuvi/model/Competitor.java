package ai.yuvi.model;

import java.time.ZonedDateTime;

import com.fasterxml.jackson.databind.JsonNode;

public class Competitor {
    private Long id; // Changed from competitorId to match database column
    private Long companyId;
    private String name;
    private String description;
    private String industry;
    private String marketPosition;
    private String trend;
    private String employeeCount;
    private String foundedYear;
    private String website;
    private String linkedinUrl;
    private String twitterUrl;
    private JsonNode strengths; // JSONB type in database
    private JsonNode weaknesses; // JSONB type in database
    private JsonNode products; // JSONB type in database
    private JsonNode metrics; // JSONB type in database
    private ZonedDateTime lastAnalyzed;
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

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getIndustry() {
        return industry;
    }
    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getMarketPosition() {
        return marketPosition;
    }
    public void setMarketPosition(String marketPosition) {
        this.marketPosition = marketPosition;
    }

    public String getTrend() {
        return trend;
    }
    public void setTrend(String trend) {
        this.trend = trend;
    }

    public String getEmployeeCount() {
        return employeeCount;
    }
    public void setEmployeeCount(String employeeCount) {
        this.employeeCount = employeeCount;
    }

    public String getFoundedYear() {
        return foundedYear;
    }
    public void setFoundedYear(String foundedYear) {
        this.foundedYear = foundedYear;
    }

    public String getWebsite() {
        return website;
    }
    public void setWebsite(String website) {
        this.website = website;
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

    public JsonNode getStrengths() {
        return strengths;
    }
    public void setStrengths(JsonNode strengths) {
        this.strengths = strengths;
    }

    public JsonNode getWeaknesses() {
        return weaknesses;
    }
    public void setWeaknesses(JsonNode weaknesses) {
        this.weaknesses = weaknesses;
    }

    public JsonNode getProducts() {
        return products;
    }
    public void setProducts(JsonNode products) {
        this.products = products;
    }

    public JsonNode getMetrics() {
        return metrics;
    }
    public void setMetrics(JsonNode metrics) {
        this.metrics = metrics;
    }

    public ZonedDateTime getLastAnalyzed() {
        return lastAnalyzed;
    }
    public void setLastAnalyzed(ZonedDateTime lastAnalyzed) {
        this.lastAnalyzed = lastAnalyzed;
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
