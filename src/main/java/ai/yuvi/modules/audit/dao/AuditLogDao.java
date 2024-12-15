package ai.yuvi.modules.audit.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import javax.sql.DataSource;

import ai.yuvi.modules.audit.enums.AuditOperation;
import ai.yuvi.modules.audit.model.AuditLog;
import ai.yuvi.modules.audit.model.AuditLogChange;

public class AuditLogDao {
    private static final Logger LOGGER = Logger.getLogger(AuditLogDao.class.getName());
    private final DataSource dataSource;

    public AuditLogDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<AuditLog> findByEntityId(String entityType, Long entityId) {
        List<AuditLog> logs = new ArrayList<>();
        String sql = "SELECT * FROM audit_logs WHERE entity_type = ? AND entity_id = ? ORDER BY timestamp DESC";
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, entityType);
            ps.setLong(2, entityId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    AuditLog log = mapResultSetToAuditLog(rs);
                    log.setChanges(findChangesByAuditLogId(log.getId()));
                    logs.add(log);
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding audit logs by entity: " + e.getMessage());
        }
        return logs;
    }

    public Optional<AuditLog> findById(Long id) {
        String sql = "SELECT * FROM audit_logs WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    AuditLog log = mapResultSetToAuditLog(rs);
                    log.setChanges(findChangesByAuditLogId(log.getId()));
                    return Optional.of(log);
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding audit log by ID: " + e.getMessage());
        }
        return Optional.empty();
    }

    public boolean create(AuditLog log) {
        String sql = """
            INSERT INTO audit_logs (
                user_id, company_id, entity_type, entity_id, operation,
                description, ip_address, user_agent, metadata, timestamp
            ) VALUES (?, ?, ?, ?, ?::audit_operation, ?, ?, ?, ?, ?)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            int paramIndex = 1;
            ps.setLong(paramIndex++, log.getUserId());
            ps.setLong(paramIndex++, log.getCompanyId());
            ps.setString(paramIndex++, log.getEntityType());
            ps.setLong(paramIndex++, log.getEntityId());
            ps.setString(paramIndex++, log.getOperation().name());
            ps.setString(paramIndex++, log.getDescription());
            ps.setString(paramIndex++, log.getIpAddress());
            ps.setString(paramIndex++, log.getUserAgent());
            ps.setString(paramIndex++, log.getMetadata());
            ps.setTimestamp(paramIndex++, Timestamp.from(log.getTimestamp().toInstant()));

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        log.setId(generatedKeys.getLong(1));
                        // Create associated changes
                        createChanges(log);
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error creating audit log: " + e.getMessage());
        }
        return false;
    }

    private void createChanges(AuditLog log) {
        if (log.getChanges() == null || log.getChanges().isEmpty()) {
            return;
        }

        String sql = """
            INSERT INTO audit_log_changes (
                audit_log_id, field, old_value, new_value, timestamp
            ) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            for (AuditLogChange change : log.getChanges()) {
                ps.setLong(1, log.getId());
                ps.setString(2, change.getField());
                ps.setString(3, change.getOldValue());
                ps.setString(4, change.getNewValue());
                ps.addBatch();
            }
            ps.executeBatch();
        } catch (SQLException e) {
            LOGGER.severe("Error creating audit log changes: " + e.getMessage());
        }
    }

    private List<AuditLogChange> findChangesByAuditLogId(Long auditLogId) {
        List<AuditLogChange> changes = new ArrayList<>();
        String sql = "SELECT * FROM audit_log_changes WHERE audit_log_id = ? ORDER BY timestamp ASC";
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, auditLogId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    changes.add(mapResultSetToAuditLogChange(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding audit log changes: " + e.getMessage());
        }
        return changes;
    }

    private AuditLog mapResultSetToAuditLog(ResultSet rs) throws SQLException {
        AuditLog log = new AuditLog();
        log.setId(rs.getLong("id"));
        log.setUserId(rs.getLong("user_id"));
        log.setCompanyId(rs.getLong("company_id"));
        log.setEntityType(rs.getString("entity_type"));
        log.setEntityId(rs.getLong("entity_id"));
        log.setOperation(AuditOperation.valueOf(rs.getString("operation")));
        log.setDescription(rs.getString("description"));
        log.setIpAddress(rs.getString("ip_address"));
        log.setUserAgent(rs.getString("user_agent"));
        log.setMetadata(rs.getString("metadata"));
        
        Timestamp timestamp = rs.getTimestamp("timestamp");
        if (timestamp != null) {
            log.setTimestamp(timestamp.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        return log;
    }

    private AuditLogChange mapResultSetToAuditLogChange(ResultSet rs) throws SQLException {
        AuditLogChange change = new AuditLogChange();
        change.setId(rs.getLong("id"));
        change.setAuditLogId(rs.getLong("audit_log_id"));
        change.setField(rs.getString("field"));
        change.setOldValue(rs.getString("old_value"));
        change.setNewValue(rs.getString("new_value"));
        
        Timestamp timestamp = rs.getTimestamp("timestamp");
        if (timestamp != null) {
            change.setTimestamp(timestamp.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        return change;
    }
}
