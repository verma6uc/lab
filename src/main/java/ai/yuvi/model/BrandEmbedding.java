package ai.yuvi.model;

import java.time.ZonedDateTime;

public class BrandEmbedding {
    private Long companyId;
    private Object embeddingVector; // Using Object type since 'vector' is a custom PostgreSQL type
    private ZonedDateTime updatedAt;

    // Getters and Setters
    public Long getCompanyId() {
        return companyId;
    }
    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public Object getEmbeddingVector() {
        return embeddingVector;
    }
    public void setEmbeddingVector(Object embeddingVector) {
        this.embeddingVector = embeddingVector;
    }

    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
