package ai.yuvi.modules.organization.dao;

import ai.yuvi.modules.organization.model.CompanyScreenshot;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.time.Instant;

/**
 * Data Access Object for managing CompanyScreenshot entities.
 * Handles CRUD operations for company screenshots in the database.
 */
public class CompanyScreenshotDao {
    private final Connection connection;

    /**
     * Constructs a new CompanyScreenshotDao with the specified database connection.
     *
     * @param connection The database connection to use
     */
    public CompanyScreenshotDao(Connection connection) {
        this.connection = connection;
    }

    /**
     * Saves a new company screenshot to the database.
     *
     * @param screenshot The screenshot to save
     * @return The ID of the newly created screenshot
     * @throws SQLException if a database error occurs
     */
    public Long save(CompanyScreenshot screenshot) throws SQLException {
        String sql = "INSERT INTO company_screenshots (company_id, screenshot_url, created_at) VALUES (?, ?, ?) RETURNING id";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setLong(1, screenshot.getCompanyId());
            stmt.setString(2, screenshot.getScreenshotUrl());
            stmt.setObject(3, Instant.now());

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getLong(1);
                }
                throw new SQLException("Failed to retrieve generated ID");
            }
        }
    }

    /**
     * Retrieves a company screenshot by its ID.
     *
     * @param id The ID of the screenshot to retrieve
     * @return The company screenshot, or null if not found
     * @throws SQLException if a database error occurs
     */
    public CompanyScreenshot findById(Long id) throws SQLException {
        String sql = "SELECT * FROM company_screenshots WHERE id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setLong(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return mapResultSetToScreenshot(rs);
                }
                return null;
            }
        }
    }

    /**
     * Retrieves all screenshots for a specific company.
     *
     * @param companyId The ID of the company
     * @return List of company screenshots
     * @throws SQLException if a database error occurs
     */
    public List<CompanyScreenshot> findByCompanyId(Long companyId) throws SQLException {
        String sql = "SELECT * FROM company_screenshots WHERE company_id = ? ORDER BY created_at DESC";
        List<CompanyScreenshot> screenshots = new ArrayList<>();
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setLong(1, companyId);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    screenshots.add(mapResultSetToScreenshot(rs));
                }
            }
        }
        return screenshots;
    }

    /**
     * Updates an existing company screenshot.
     *
     * @param screenshot The screenshot to update
     * @throws SQLException if a database error occurs
     */
    public void update(CompanyScreenshot screenshot) throws SQLException {
        String sql = "UPDATE company_screenshots SET screenshot_url = ? WHERE id = ? AND company_id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, screenshot.getScreenshotUrl());
            stmt.setLong(2, screenshot.getId());
            stmt.setLong(3, screenshot.getCompanyId());
            int rowsAffected = stmt.executeUpdate();
            if (rowsAffected == 0) {
                throw new SQLException("Screenshot update failed, no rows affected.");
            }
        }
    }

    /**
     * Deletes a company screenshot by its ID.
     *
     * @param id The ID of the screenshot to delete
     * @throws SQLException if a database error occurs
     */
    public void delete(Long id) throws SQLException {
        String sql = "DELETE FROM company_screenshots WHERE id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setLong(1, id);
            stmt.executeUpdate();
        }
    }

    /**
     * Maps a ResultSet row to a CompanyScreenshot object.
     *
     * @param rs The ResultSet containing screenshot data
     * @return A populated CompanyScreenshot object
     * @throws SQLException if a database error occurs
     */
    private CompanyScreenshot mapResultSetToScreenshot(ResultSet rs) throws SQLException {
        CompanyScreenshot screenshot = new CompanyScreenshot();
        screenshot.setId(rs.getLong("id"));
        screenshot.setCompanyId(rs.getLong("company_id"));
        screenshot.setScreenshotUrl(rs.getString("screenshot_url"));
        screenshot.setCreatedAt(rs.getObject("created_at", Instant.class));
        return screenshot;
    }
}
