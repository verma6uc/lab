package ai.yuvi.modules.brand.model;

import java.time.ZonedDateTime;

public class Brand {
    private Long id;
    private String name;
    private String description;
    private String logoUrl;
    private String colorPalette;
    private String typography;
    private String styleGuideUrl;
    private String brandVoice;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
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

    public String getLogoUrl() {
        return logoUrl;
    }
    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public String getColorPalette() {
        return colorPalette;
    }
    public void setColorPalette(String colorPalette) {
        this.colorPalette = colorPalette;
    }

    public String getTypography() {
        return typography;
    }
    public void setTypography(String typography) {
        this.typography = typography;
    }

    public String getStyleGuideUrl() {
        return styleGuideUrl;
    }
    public void setStyleGuideUrl(String styleGuideUrl) {
        this.styleGuideUrl = styleGuideUrl;
    }

    public String getBrandVoice() {
        return brandVoice;
    }
    public void setBrandVoice(String brandVoice) {
        this.brandVoice = brandVoice;
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
