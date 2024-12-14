package ai.yuvi.model;

 import java.time.ZonedDateTime;
import java.math.BigDecimal;
import java.util.UUID;

public class UserSession {
    private UUID sessionId;
    private Long userId;
    private Long companyId;
    
    // Session Status
    private SessionStatus status;
    private ZonedDateTime startedAt;
    private ZonedDateTime lastActivityAt;
    private ZonedDateTime endedAt;
    private Integer durationSeconds;
    
    // Device Information
    private DeviceType deviceType;
    private Browser browser;
    private String browserVersion;
    private OsType osType;
    private String osVersion;
    private String deviceId;
    
    // Location Information
    private String ipAddress;
    private String city;
    private String country;
    private BigDecimal latitude;
    private BigDecimal longitude;
    
    // Technical Details
    private String userAgent;
    private String screenResolution;
    private String language;
    private String timezone;
    
    // Security & Performance
    private boolean isAuthenticated;
    private boolean isSecureConnection;
    private String connectionType;
    private String networkSpeed;
    
    // Page Navigation
    private String currentPage;
    private String previousPage;
    private Integer pageViews;
    
    // Analytics
    private Integer totalClicks;
    private Integer totalActions;
    private BigDecimal bounceRate;
    
    // System Columns
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;

    // Default Constructor
    public UserSession() {}

	public UUID getSessionId() {
		return sessionId;
	}

	public void setSessionId(UUID sessionId) {
		this.sessionId = sessionId;
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

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
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

	public boolean isAuthenticated() {
		return isAuthenticated;
	}

	public void setAuthenticated(boolean isAuthenticated) {
		this.isAuthenticated = isAuthenticated;
	}

	public boolean isSecureConnection() {
		return isSecureConnection;
	}

	public void setSecureConnection(boolean isSecureConnection) {
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

    // Getters and Setters
    
} 