package ai.yuvi.modules.conversation.model;

import java.time.ZonedDateTime;

import ai.yuvi.modules.conversation.enums.ConversationStatus;

public class Conversation {
    private Long id;
    private Long userId;
    private Long companyId;
    private String title;
    private String description;
    private String context;
    private ConversationStatus status;
    private String model;
    private String systemPrompt;
    private Integer messageCount;
    private ZonedDateTime lastMessageAt;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
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

    public String getContext() {
        return context;
    }
    public void setContext(String context) {
        this.context = context;
    }

    public ConversationStatus getStatus() {
        return status;
    }
    public void setStatus(ConversationStatus status) {
        this.status = status;
    }

    public String getModel() {
        return model;
    }
    public void setModel(String model) {
        this.model = model;
    }

    public String getSystemPrompt() {
        return systemPrompt;
    }
    public void setSystemPrompt(String systemPrompt) {
        this.systemPrompt = systemPrompt;
    }

    public Integer getMessageCount() {
        return messageCount;
    }
    public void setMessageCount(Integer messageCount) {
        this.messageCount = messageCount;
    }

    public ZonedDateTime getLastMessageAt() {
        return lastMessageAt;
    }
    public void setLastMessageAt(ZonedDateTime lastMessageAt) {
        this.lastMessageAt = lastMessageAt;
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
