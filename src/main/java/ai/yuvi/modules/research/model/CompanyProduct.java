package ai.yuvi.modules.research.model;

import java.time.ZonedDateTime;

public class CompanyProduct {
    private Long id;
    private Long companyId;
    private String name;
    private String description;
    private String features;
    private String targetAudience;
    private String useCases;
    private String pricing;
    private String currency;
    private String productUrl;
    private String documentationUrl;
    private String apiUrl;
    private String status;
    private ZonedDateTime launchDate;
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

    public String getFeatures() {
        return features;
    }
    public void setFeatures(String features) {
        this.features = features;
    }

    public String getTargetAudience() {
        return targetAudience;
    }
    public void setTargetAudience(String targetAudience) {
        this.targetAudience = targetAudience;
    }

    public String getUseCases() {
        return useCases;
    }
    public void setUseCases(String useCases) {
        this.useCases = useCases;
    }

    public String getPricing() {
        return pricing;
    }
    public void setPricing(String pricing) {
        this.pricing = pricing;
    }

    public String getCurrency() {
        return currency;
    }
    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getProductUrl() {
        return productUrl;
    }
    public void setProductUrl(String productUrl) {
        this.productUrl = productUrl;
    }

    public String getDocumentationUrl() {
        return documentationUrl;
    }
    public void setDocumentationUrl(String documentationUrl) {
        this.documentationUrl = documentationUrl;
    }

    public String getApiUrl() {
        return apiUrl;
    }
    public void setApiUrl(String apiUrl) {
        this.apiUrl = apiUrl;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public ZonedDateTime getLaunchDate() {
        return launchDate;
    }
    public void setLaunchDate(ZonedDateTime launchDate) {
        this.launchDate = launchDate;
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
