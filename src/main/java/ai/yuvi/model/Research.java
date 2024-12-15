package ai.yuvi.model;

import java.time.ZonedDateTime;

import com.fasterxml.jackson.databind.JsonNode;

public class Research {
    private Long id; // Changed from researchId to match database column
    private Long companyId;
    private String title;
    private String description;
    private String type;
    private JsonNode authors; // JSONB type in database
    private ZonedDateTime publishedDate;
    private String link;
    private JsonNode tags; // JSONB type in database
    private String status;
    private Integer downloads;
    private Integer views;
    private JsonNode attachments; // JSONB type in database
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

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public JsonNode getAuthors() {
        return authors;
    }
    public void setAuthors(JsonNode authors) {
        this.authors = authors;
    }

    public ZonedDateTime getPublishedDate() {
        return publishedDate;
    }
    public void setPublishedDate(ZonedDateTime publishedDate) {
        this.publishedDate = publishedDate;
    }

    public String getLink() {
        return link;
    }
    public void setLink(String link) {
        this.link = link;
    }

    public JsonNode getTags() {
        return tags;
    }
    public void setTags(JsonNode tags) {
        this.tags = tags;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getDownloads() {
        return downloads;
    }
    public void setDownloads(Integer downloads) {
        this.downloads = downloads;
    }

    public Integer getViews() {
        return views;
    }
    public void setViews(Integer views) {
        this.views = views;
    }

    public JsonNode getAttachments() {
        return attachments;
    }
    public void setAttachments(JsonNode attachments) {
        this.attachments = attachments;
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
