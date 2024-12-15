package ai.yuvi.modules.brand.model;

import java.time.ZonedDateTime;

public class CompanyBrand {
    private Long id;
    private Long companyId;
    private Long brandId;
    private String status;
    private ZonedDateTime activatedAt;
    private ZonedDateTime deactivatedAt;
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

    public Long getBrandId() {
        return brandId;
    }
    public void setBrandId(Long brandId) {
        this.brandId = brandId;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public ZonedDateTime getActivatedAt() {
        return activatedAt;
    }
    public void setActivatedAt(ZonedDateTime activatedAt) {
        this.activatedAt = activatedAt;
    }

    public ZonedDateTime getDeactivatedAt() {
        return deactivatedAt;
    }
    public void setDeactivatedAt(ZonedDateTime deactivatedAt) {
        this.deactivatedAt = deactivatedAt;
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
