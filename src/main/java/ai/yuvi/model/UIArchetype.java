package ai.yuvi.model;

import java.time.ZonedDateTime;

public class UIArchetype {
    private Long archetypeId;
    private Long companyId;
    private String name;
    private String description;
    private String category;
    private String imageUrl;
    private String sourceUrl;
    private String implementation;
    private String usageGuidelines;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;

    // Getters and Setters
    public Long getArchetypeId() { return archetypeId; }
    public void setArchetypeId(Long archetypeId) { this.archetypeId = archetypeId; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getSourceUrl() { return sourceUrl; }
    public void setSourceUrl(String sourceUrl) { this.sourceUrl = sourceUrl; }

    public String getImplementation() { return implementation; }
    public void setImplementation(String implementation) { this.implementation = implementation; }

    public String getUsageGuidelines() { return usageGuidelines; }
    public void setUsageGuidelines(String usageGuidelines) { this.usageGuidelines = usageGuidelines; }

    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }

    public ZonedDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(ZonedDateTime updatedAt) { this.updatedAt = updatedAt; }
} 