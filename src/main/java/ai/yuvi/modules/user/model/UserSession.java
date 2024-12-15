package ai.yuvi.modules.user.model;

import java.time.ZonedDateTime;
import java.util.UUID;

import ai.yuvi.modules.user.enums.Browser;
import ai.yuvi.modules.user.enums.DeviceType;
import ai.yuvi.modules.user.enums.OsType;
import ai.yuvi.modules.user.enums.SessionStatus;

public class UserSession {
    private Long id;
    private UUID sessionId;
    private Long userId;
    private String ipAddress;
    private String userAgent;
    private Browser browser;
    private String browserVersion;
    private OsType os;
    private String osVersion;
    private DeviceType deviceType;
    private boolean authenticated;
    private boolean secureConnection;
    private SessionStatus status;
    private ZonedDateTime lastActivityAt;
    private ZonedDateTime expiresAt;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

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

    public String getIpAddress() {
        return ipAddress;
    }
    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getUserAgent() {
        return userAgent;
    }
    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
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

    public OsType getOs() {
        return os;
    }
    public void setOs(OsType os) {
        this.os = os;
    }

    public String getOsVersion() {
        return osVersion;
    }
    public void setOsVersion(String osVersion) {
        this.osVersion = osVersion;
    }

    public DeviceType getDeviceType() {
        return deviceType;
    }
    public void setDeviceType(DeviceType deviceType) {
        this.deviceType = deviceType;
    }

    public boolean isAuthenticated() {
        return authenticated;
    }
    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }

    public boolean isSecureConnection() {
        return secureConnection;
    }
    public void setSecureConnection(boolean secureConnection) {
        this.secureConnection = secureConnection;
    }

    public SessionStatus getStatus() {
        return status;
    }
    public void setStatus(SessionStatus status) {
        this.status = status;
    }

    public ZonedDateTime getLastActivityAt() {
        return lastActivityAt;
    }
    public void setLastActivityAt(ZonedDateTime lastActivityAt) {
        this.lastActivityAt = lastActivityAt;
    }

    public ZonedDateTime getExpiresAt() {
        return expiresAt;
    }
    public void setExpiresAt(ZonedDateTime expiresAt) {
        this.expiresAt = expiresAt;
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
