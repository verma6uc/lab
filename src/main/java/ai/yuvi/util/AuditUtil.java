package ai.yuvi.util;

import java.time.OffsetDateTime;
import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import ai.yuvi.model.AuditLog;
import ai.yuvi.model.AuditLogChange;

/**
 * Utility class to simplify creation of audit log records.
 * This may be called from DAOs or Services after database operations.
 */
public class AuditUtil {

    /**
     * Create an AuditLog entry for a given operation.
     * 
     * @param tableName   Name of the table affected
     * @param recordId    The primary key of the changed record
     * @param operation   Type of operation: "INSERT", "UPDATE", "DELETE"
     * @param performedBy The user or system actor who performed the operation
     * @return A new AuditLog object
     */
    public static AuditLog createAuditLog(String tableName, long recordId, String operation, String performedBy) {
        AuditLog log = new AuditLog();
        log.setTableName(tableName);
        log.setRecordId(recordId);
        log.setOperation(operation);
        log.setPerformedBy(performedBy);
        log.setPerformedAt(OffsetDateTime.now().atZoneSameInstant(ZoneId.systemDefault()));
        return log;
    }

    /**
     * Create a list of AuditLogChange records representing column-level changes.
     * 
     * @param auditId    The ID of the parent audit_log entry (assigned after insertion)
     * @param changes    A list of ColumnChange objects representing old/new values
     * @return A list of AuditLogChange objects
     */
    public static List<AuditLogChange> createAuditLogChanges(long auditId, List<ColumnChange> changes) {
        List<AuditLogChange> result = new ArrayList<>();
        for (ColumnChange c : changes) {
            AuditLogChange change = new AuditLogChange();
            change.setAuditId(auditId);
            change.setColumnName(c.columnName);
            change.setOldValue(c.oldValue);
            change.setNewValue(c.newValue);
            result.add(change);
        }
        return result;
    }

    /**
     * Helper class representing a single column change.
     */
    public static class ColumnChange {
        public String columnName;
        public String oldValue;
        public String newValue;

        public ColumnChange(String columnName, String oldValue, String newValue) {
            this.columnName = columnName;
            this.oldValue = oldValue;
            this.newValue = newValue;
        }
    }
}
