package ai.yuvi.model;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;

public class Research {
    private Long researchId;
    private Long companyId;
    private String title;
    private String description;
    private String type;
    private List<String> authors;
    private ZonedDateTime publishedDate;
    private String link;
    private List<String> tags;
    private String status;
    private int downloads;
    private int views;
    private List<Map<String, Object>> attachments;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;

    // Getters and Setters
    public Long getResearchId() { return researchId; }
    public void setResearchId(Long researchId) { this.researchId = researchId; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public List<String> getAuthors() { return authors; }
    public void setAuthors(List<String> authors) { this.authors = authors; }

    public ZonedDateTime getPublishedDate() { return publishedDate; }
    public void setPublishedDate(ZonedDateTime publishedDate) { this.publishedDate = publishedDate; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getDownloads() { return downloads; }
    public void setDownloads(int downloads) { this.downloads = downloads; }

    public int getViews() { return views; }
    public void setViews(int views) { this.views = views; }

    public List<Map<String, Object>> getAttachments() { return attachments; }
    public void setAttachments(List<Map<String, Object>> attachments) { this.attachments = attachments; }

    public ZonedDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(ZonedDateTime createdAt) { this.createdAt = createdAt; }

    public ZonedDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(ZonedDateTime updatedAt) { this.updatedAt = updatedAt; }
} 