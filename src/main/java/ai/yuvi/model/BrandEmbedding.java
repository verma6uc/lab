package ai.yuvi.model;

import java.time.ZonedDateTime;

public class BrandEmbedding {
    private Long companyId;
    private double[] embeddingVector;
    private ZonedDateTime updatedAt;

    // Getters and Setters
    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public double[] getEmbeddingVector() { return embeddingVector; }
    public void setEmbeddingVector(double[] embeddingVector) { this.embeddingVector = embeddingVector; }

    public ZonedDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(ZonedDateTime updatedAt) { this.updatedAt = updatedAt; }
}