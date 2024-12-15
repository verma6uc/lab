package ai.yuvi.modules.audit.model;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import ai.yuvi.modules.audit.enums.AuditOperation;

public class AuditLog {
    private Long id;
    private Long userId;
    private Long companyId;
    private String entityType;
    private Long entityId;
    private AuditOperation operation;
    private String description;
    private String ipAddress;
    private String userAgent;
    private String metadata;
    private ZonedDateTime timestamp;
    private List<AuditLogChange> changes;

    public AuditLog() {
        this.changes = new ArrayList<>();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
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

    public String getEntityType() {
        return entityType;
    }
    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public Long getEntityId() {
        return entityId;
    }
    public void setEntityId(Long entityId) {
        this.entityId = entityId;
    }

    public AuditOperation getOperation() {
        return operation;
    }
    public void setOperation(AuditOperation operation) {
        this.operation = operation;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
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

    public String getMetadata() {
        return metadata;
    }
    public void setMetadata(String metadata) {
        this.metadata = metadata;
    }

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(ZonedDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public List<AuditLogChange> getChanges() {
        return changes;
    }
    public void setChanges(List<AuditLogChange> changes) {
        this.changes = changes;
    }

    // Helper methods
    public void addChange(AuditLogChange change) {
        if (this.changes == null) {
            this.changes = new ArrayList<>();
        }
        this.changes.add(change);
    }

    public void addChange(String field, String oldValue, String newValue) {
        AuditLogChange change = new AuditLogChange();
        change.setField(field);
        change.setOldValue(oldValue);
        change.setNewValue(newValue);
        addChange(change);
    }
}
