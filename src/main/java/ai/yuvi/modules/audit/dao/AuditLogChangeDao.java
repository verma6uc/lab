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

import ai.yuvi.modules.audit.model.AuditLogChange;

public class AuditLogChangeDao {
    private static final Logger LOGGER = Logger.getLogger(AuditLogChangeDao.class.getName());
    private final DataSource dataSource;

    public AuditLogChangeDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<AuditLogChange> findByAuditLogId(Long auditLogId) {
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
            LOGGER.severe("Error finding audit log changes by audit log ID: " + e.getMessage());
        }
        return changes;
    }

    public Optional<AuditLogChange> findById(Long id) {
        String sql = "SELECT * FROM audit_log_changes WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToAuditLogChange(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding audit log change by ID: " + e.getMessage());
        }
        return Optional.empty();
    }

    public boolean create(AuditLogChange change) {
        String sql = """
            INSERT INTO audit_log_changes (
                audit_log_id, field, old_value, new_value, timestamp
            ) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            ps.setLong(1, change.getAuditLogId());
            ps.setString(2, change.getField());
            ps.setString(3, change.getOldValue());
            ps.setString(4, change.getNewValue());

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        change.setId(generatedKeys.getLong(1));
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error creating audit log change: " + e.getMessage());
        }
        return false;
    }

    public boolean createBatch(List<AuditLogChange> changes) {
        if (changes == null || changes.isEmpty()) {
            return false;
        }

        String sql = """
            INSERT INTO audit_log_changes (
                audit_log_id, field, old_value, new_value, timestamp
            ) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            for (AuditLogChange change : changes) {
                ps.setLong(1, change.getAuditLogId());
                ps.setString(2, change.getField());
                ps.setString(3, change.getOldValue());
                ps.setString(4, change.getNewValue());
                ps.addBatch();
            }
            int[] results = ps.executeBatch();
            return results.length == changes.size();
        } catch (SQLException e) {
            LOGGER.severe("Error creating audit log changes batch: " + e.getMessage());
            return false;
        }
    }

    public boolean deleteByAuditLogId(Long auditLogId) {
        String sql = "DELETE FROM audit_log_changes WHERE audit_log_id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, auditLogId);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting audit log changes: " + e.getMessage());
            return false;
        }
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
