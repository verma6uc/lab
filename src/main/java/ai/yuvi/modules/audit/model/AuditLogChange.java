package ai.yuvi.modules.audit.model;

import java.time.ZonedDateTime;

public class AuditLogChange {
    private Long id;
    private Long auditLogId;
    private String field;
    private String oldValue;
    private String newValue;
    private ZonedDateTime timestamp;

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getAuditLogId() {
        return auditLogId;
    }
    public void setAuditLogId(Long auditLogId) {
        this.auditLogId = auditLogId;
    }

    public String getField() {
        return field;
    }
    public void setField(String field) {
        this.field = field;
    }

    public String getOldValue() {
        return oldValue;
    }
    public void setOldValue(String oldValue) {
        this.oldValue = oldValue;
    }

    public String getNewValue() {
        return newValue;
    }
    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }

    public ZonedDateTime getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(ZonedDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
