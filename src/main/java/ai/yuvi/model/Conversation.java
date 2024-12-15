package ai.yuvi.model;

import java.time.ZonedDateTime;

public class Conversation {
    private Long id;
    private String contextType;
    private Long contextId;
    private String goal;
    private String model; // Added to match database column
    private Integer requestTokens; // Added to match database column
    private Integer responseTokens; // Added to match database column
    private Double executionTime; // Added to match database column
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getContextType() {
        return contextType;
    }
    public void setContextType(String contextType) {
        this.contextType = contextType;
    }

    public Long getContextId() {
        return contextId;
    }
    public void setContextId(Long contextId) {
        this.contextId = contextId;
    }

    public String getGoal() {
        return goal;
    }
    public void setGoal(String goal) {
        this.goal = goal;
    }

    public String getModel() {
        return model;
    }
    public void setModel(String model) {
        this.model = model;
    }

    public Integer getRequestTokens() {
        return requestTokens;
    }
    public void setRequestTokens(Integer requestTokens) {
        this.requestTokens = requestTokens;
    }

    public Integer getResponseTokens() {
        return responseTokens;
    }
    public void setResponseTokens(Integer responseTokens) {
        this.responseTokens = responseTokens;
    }

    public Double getExecutionTime() {
        return executionTime;
    }
    public void setExecutionTime(Double executionTime) {
        this.executionTime = executionTime;
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
