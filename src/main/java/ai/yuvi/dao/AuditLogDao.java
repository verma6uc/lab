package ai.yuvi.dao;

import ai.yuvi.model.AuditLog;
import ai.yuvi.model.AuditLogChange;
import ai.yuvi.config.DataSourceProvider;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

public class AuditLogDao {
    private static final Logger LOGGER = Logger.getLogger(AuditLogDao.class.getName());

    public Long createAuditLog(AuditLog auditLog) {
        String sql = """
            INSERT INTO audit_log (table_name, record_id, operation, performed_by)
            VALUES (?, ?, ?, ?)
            RETURNING audit_id
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, auditLog.getTableName());
            stmt.setLong(2, auditLog.getRecordId());
            stmt.setString(3, auditLog.getOperation());
            stmt.setString(4, auditLog.getPerformedBy());

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Long auditId = rs.getLong(1);
                    // Create associated changes
                    createAuditLogChanges(conn, auditId, auditLog.getChanges());
                    return auditId;
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error creating audit log", e);
        }
        return null;
    }

    private void createAuditLogChanges(Connection conn, Long auditId, List<AuditLogChange> changes) throws SQLException {
        String sql = """
            INSERT INTO audit_log_change (audit_id, column_name, old_value, new_value)
            VALUES (?, ?, ?, ?)
        """;

        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            for (AuditLogChange change : changes) {
                stmt.setLong(1, auditId);
                stmt.setString(2, change.getColumnName());
                stmt.setString(3, change.getOldValue());
                stmt.setString(4, change.getNewValue());
                stmt.addBatch();
            }
            stmt.executeBatch();
        }
    }

    public Optional<AuditLog> findById(Long auditId) {
        String sql = """
            SELECT al.*, alc.audit_change_id, alc.column_name, alc.old_value, alc.new_value
            FROM audit_log al
            LEFT JOIN audit_log_change alc ON al.audit_id = alc.audit_id
            WHERE al.audit_id = ?
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, auditId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                return Optional.ofNullable(mapResultSetToAuditLog(rs));
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error finding audit log by ID", e);
        }
        return Optional.empty();
    }

    public List<AuditLog> findByTableAndRecordId(String tableName, Long recordId) {
        String sql = """
            SELECT al.*, alc.audit_change_id, alc.column_name, alc.old_value, alc.new_value
            FROM audit_log al
            LEFT JOIN audit_log_change alc ON al.audit_id = alc.audit_id
            WHERE al.table_name = ? AND al.record_id = ?
            ORDER BY al.performed_at DESC
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, tableName);
            stmt.setLong(2, recordId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                return mapResultSetToAuditLogs(rs);
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error finding audit logs by table and record ID", e);
        }
        return new ArrayList<>();
    }

    private AuditLog mapResultSetToAuditLog(ResultSet rs) throws SQLException {
        if (!rs.next()) return null;

        AuditLog auditLog = new AuditLog();
        auditLog.setAuditId(rs.getLong("audit_id"));
        auditLog.setTableName(rs.getString("table_name"));
        auditLog.setRecordId(rs.getLong("record_id"));
        auditLog.setOperation(rs.getString("operation"));
        auditLog.setPerformedBy(rs.getString("performed_by"));
        auditLog.setPerformedAt(rs.getObject("performed_at", Timestamp.class).toInstant().atZone(java.time.ZoneId.systemDefault()));

        do {
            if (rs.getLong("audit_change_id") != 0) {
                auditLog.addChange(mapResultSetToAuditLogChange(rs));
            }
        } while (rs.next());

        return auditLog;
    }

    private List<AuditLog> mapResultSetToAuditLogs(ResultSet rs) throws SQLException {
        List<AuditLog> auditLogs = new ArrayList<>();
        Long currentAuditId = null;
        AuditLog currentAuditLog = null;

        while (rs.next()) {
            Long auditId = rs.getLong("audit_id");
            if (!auditId.equals(currentAuditId)) {
                currentAuditId = auditId;
                currentAuditLog = new AuditLog();
                currentAuditLog.setAuditId(auditId);
                currentAuditLog.setTableName(rs.getString("table_name"));
                currentAuditLog.setRecordId(rs.getLong("record_id"));
                currentAuditLog.setOperation(rs.getString("operation"));
                currentAuditLog.setPerformedBy(rs.getString("performed_by"));
                currentAuditLog.setPerformedAt(rs.getObject("performed_at", Timestamp.class).toInstant().atZone(java.time.ZoneId.systemDefault()));
                auditLogs.add(currentAuditLog);
            }

            if (rs.getLong("audit_change_id") != 0) {
                currentAuditLog.addChange(mapResultSetToAuditLogChange(rs));
            }
        }

        return auditLogs;
    }

    private AuditLogChange mapResultSetToAuditLogChange(ResultSet rs) throws SQLException {
        AuditLogChange change = new AuditLogChange();
        change.setAuditChangeId(rs.getLong("audit_change_id"));
        change.setAuditId(rs.getLong("audit_id"));
        change.setColumnName(rs.getString("column_name"));
        change.setOldValue(rs.getString("old_value"));
        change.setNewValue(rs.getString("new_value"));
        return change;
    }
}

