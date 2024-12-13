package ai.yuvi.model;
public class CompanyScreenshot {
    private long screenshotId;
    private long companyId;
    private String imageUrl;
    private java.time.OffsetDateTime capturedAt;

    public long getScreenshotId() {
        return screenshotId;
    }
    public void setScreenshotId(long screenshotId) {
        this.screenshotId = screenshotId;
    }
    public long getCompanyId() {
        return companyId;
    }
    public void setCompanyId(long companyId) {
        this.companyId = companyId;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    public java.time.OffsetDateTime getCapturedAt() {
        return capturedAt;
    }
    public void setCapturedAt(java.time.OffsetDateTime capturedAt) {
        this.capturedAt = capturedAt;
    }
}