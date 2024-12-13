package ai.yuvi.model;
public class CompanyBrand {
    private long companyId;
    private String primaryColor;
    private String secondaryColor;
    private String fontFamily;
    private String logoUrl;

    public long getCompanyId() {
        return companyId;
    }
    public void setCompanyId(long companyId) {
        this.companyId = companyId;
    }
    public String getPrimaryColor() {
        return primaryColor;
    }
    public void setPrimaryColor(String primaryColor) {
        this.primaryColor = primaryColor;
    }
    public String getSecondaryColor() {
        return secondaryColor;
    }
    public void setSecondaryColor(String secondaryColor) {
        this.secondaryColor = secondaryColor;
    }
    public String getFontFamily() {
        return fontFamily;
    }
    public void setFontFamily(String fontFamily) {
        this.fontFamily = fontFamily;
    }
    public String getLogoUrl() {
        return logoUrl;
    }
    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }
}