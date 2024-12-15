package ai.yuvi.modules.research.model;

import java.time.ZonedDateTime;

public class Research {
    private Long id;
    private Long companyId;
    private String title;
    private String category;
    private String description;
    private String methodology;
    private String findings;
    private String recommendations;
    private String conductedBy;
    private Integer participantCount;
    private Double budget;
    private String currency;
    private String documentUrl;
    private String presentationUrl;
    private ZonedDateTime startDate;
    private ZonedDateTime endDate;
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

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getMethodology() {
        return methodology;
    }
    public void setMethodology(String methodology) {
        this.methodology = methodology;
    }

    public String getFindings() {
        return findings;
    }
    public void setFindings(String findings) {
        this.findings = findings;
    }

    public String getRecommendations() {
        return recommendations;
    }
    public void setRecommendations(String recommendations) {
        this.recommendations = recommendations;
    }

    public String getConductedBy() {
        return conductedBy;
    }
    public void setConductedBy(String conductedBy) {
        this.conductedBy = conductedBy;
    }

    public Integer getParticipantCount() {
        return participantCount;
    }
    public void setParticipantCount(Integer participantCount) {
        this.participantCount = participantCount;
    }

    public Double getBudget() {
        return budget;
    }
    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public String getCurrency() {
        return currency;
    }
    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getDocumentUrl() {
        return documentUrl;
    }
    public void setDocumentUrl(String documentUrl) {
        this.documentUrl = documentUrl;
    }

    public String getPresentationUrl() {
        return presentationUrl;
    }
    public void setPresentationUrl(String presentationUrl) {
        this.presentationUrl = presentationUrl;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }
    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }
    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
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
