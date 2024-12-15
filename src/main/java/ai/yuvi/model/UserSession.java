package ai.yuvi.model;

import java.math.BigDecimal;
import java.net.InetAddress;
import java.time.ZonedDateTime;

public class UserSession {
    private String id; // UUID in database
    private Long userId;
    private Long companyId;
    private SessionStatus status;
    private ZonedDateTime startedAt;
    private ZonedDateTime lastActivityAt;
    private ZonedDateTime endedAt;
    private Integer durationSeconds;
    private DeviceType deviceType;
    private Browser browser;
    private String browserVersion;
    private OsType osType;
    private String osVersion;
    private String deviceId;
    private InetAddress ipAddress;
    private String city;
    private String country;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String userAgent;
    private String screenResolution;
    private String language;
    private String timezone;
    private Boolean isAuthenticated;
    private Boolean isSecureConnection;
    private String connectionType;
    private String networkSpeed;
    private String currentPage;
    private String previousPage;
    private Integer pageViews;
    private Integer totalClicks;
    private Integer totalActions;
    private BigDecimal bounceRate;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;

    // Getters and Setters
    public String getId() {
        return id;
    }
    public void setId(String id) {
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

    public SessionStatus getStatus() {
        return status;
    }
    public void setStatus(SessionStatus status) {
        this.status = status;
    }

    public ZonedDateTime getStartedAt() {
        return startedAt;
    }
    public void setStartedAt(ZonedDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public ZonedDateTime getLastActivityAt() {
        return lastActivityAt;
    }
    public void setLastActivityAt(ZonedDateTime lastActivityAt) {
        this.lastActivityAt = lastActivityAt;
    }

    public ZonedDateTime getEndedAt() {
        return endedAt;
    }
    public void setEndedAt(ZonedDateTime endedAt) {
        this.endedAt = endedAt;
    }

    public Integer getDurationSeconds() {
        return durationSeconds;
    }
    public void setDurationSeconds(Integer durationSeconds) {
        this.durationSeconds = durationSeconds;
    }

    public DeviceType getDeviceType() {
        return deviceType;
    }
    public void setDeviceType(DeviceType deviceType) {
        this.deviceType = deviceType;
    }

    public Browser getBrowser() {
        return browser;
    }
    public void setBrowser(Browser browser) {
        this.browser = browser;
    }

    public String getBrowserVersion() {
        return browserVersion;
    }
    public void setBrowserVersion(String browserVersion) {
        this.browserVersion = browserVersion;
    }

    public OsType getOsType() {
        return osType;
    }
    public void setOsType(OsType osType) {
        this.osType = osType;
    }

    public String getOsVersion() {
        return osVersion;
    }
    public void setOsVersion(String osVersion) {
        this.osVersion = osVersion;
    }

    public String getDeviceId() {
        return deviceId;
    }
    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public InetAddress getIpAddress() {
        return ipAddress;
    }
    public void setIpAddress(InetAddress ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }
    public void setCountry(String country) {
        this.country = country;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }
    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }
    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public String getUserAgent() {
        return userAgent;
    }
    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public String getScreenResolution() {
        return screenResolution;
    }
    public void setScreenResolution(String screenResolution) {
        this.screenResolution = screenResolution;
    }

    public String getLanguage() {
        return language;
    }
    public void setLanguage(String language) {
        this.language = language;
    }

    public String getTimezone() {
        return timezone;
    }
    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public Boolean getIsAuthenticated() {
        return isAuthenticated;
    }
    public void setIsAuthenticated(Boolean isAuthenticated) {
        this.isAuthenticated = isAuthenticated;
    }

    public Boolean getIsSecureConnection() {
        return isSecureConnection;
    }
    public void setIsSecureConnection(Boolean isSecureConnection) {
        this.isSecureConnection = isSecureConnection;
    }

    public String getConnectionType() {
        return connectionType;
    }
    public void setConnectionType(String connectionType) {
        this.connectionType = connectionType;
    }

    public String getNetworkSpeed() {
        return networkSpeed;
    }
    public void setNetworkSpeed(String networkSpeed) {
        this.networkSpeed = networkSpeed;
    }

    public String getCurrentPage() {
        return currentPage;
    }
    public void setCurrentPage(String currentPage) {
        this.currentPage = currentPage;
    }

    public String getPreviousPage() {
        return previousPage;
    }
    public void setPreviousPage(String previousPage) {
        this.previousPage = previousPage;
    }

    public Integer getPageViews() {
        return pageViews;
    }
    public void setPageViews(Integer pageViews) {
        this.pageViews = pageViews;
    }

    public Integer getTotalClicks() {
        return totalClicks;
    }
    public void setTotalClicks(Integer totalClicks) {
        this.totalClicks = totalClicks;
    }

    public Integer getTotalActions() {
        return totalActions;
    }
    public void setTotalActions(Integer totalActions) {
        this.totalActions = totalActions;
    }

    public BigDecimal getBounceRate() {
        return bounceRate;
    }
    public void setBounceRate(BigDecimal bounceRate) {
        this.bounceRate = bounceRate;
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
