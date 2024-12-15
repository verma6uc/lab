package ai.yuvi.modules.brand.dao;

import java.sql.Array;
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

import org.postgresql.util.PGobject;

import ai.yuvi.modules.brand.model.BrandEmbedding;

public class BrandEmbeddingDao {
    private static final Logger LOGGER = Logger.getLogger(BrandEmbeddingDao.class.getName());
    private final DataSource dataSource;

    public BrandEmbeddingDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public List<BrandEmbedding> findByBrandId(Long brandId) {
        List<BrandEmbedding> embeddings = new ArrayList<>();
        String sql = "SELECT * FROM brand_embeddings WHERE brand_id = ? ORDER BY created_at DESC";
        
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, brandId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    embeddings.add(mapResultSetToBrandEmbedding(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding brand embeddings by brand ID: " + e.getMessage());
        }
        return embeddings;
    }

    public Optional<BrandEmbedding> findById(Long id) {
        String sql = "SELECT * FROM brand_embeddings WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToBrandEmbedding(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error finding brand embedding by ID: " + e.getMessage());
        }
        return Optional.empty();
    }

    public boolean create(BrandEmbedding embedding) {
        String sql = """
            INSERT INTO brand_embeddings (
                brand_id, embedding, source, description,
                created_at, updated_at
            ) VALUES (?, ?::vector, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            int paramIndex = 1;
            ps.setLong(paramIndex++, embedding.getBrandId());
            
            // Convert List<Double> to PostgreSQL vector
            PGobject vectorObj = new PGobject();
            vectorObj.setType("vector");
            vectorObj.setValue(embedding.getEmbedding().toString().replace("[", "[").replace("]", "]"));
            ps.setObject(paramIndex++, vectorObj);
            
            ps.setString(paramIndex++, embedding.getSource());
            ps.setString(paramIndex++, embedding.getDescription());

            int affectedRows = ps.executeUpdate();
            if (affectedRows > 0) {
                try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        embedding.setId(generatedKeys.getLong(1));
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            LOGGER.severe("Error creating brand embedding: " + e.getMessage());
        }
        return false;
    }

    public boolean update(BrandEmbedding embedding) {
        String sql = """
            UPDATE brand_embeddings SET 
                embedding = ?::vector, source = ?, description = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        """;
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            int paramIndex = 1;
            
            // Convert List<Double> to PostgreSQL vector
            PGobject vectorObj = new PGobject();
            vectorObj.setType("vector");
            vectorObj.setValue(embedding.getEmbedding().toString().replace("[", "[").replace("]", "]"));
            ps.setObject(paramIndex++, vectorObj);
            
            ps.setString(paramIndex++, embedding.getSource());
            ps.setString(paramIndex++, embedding.getDescription());
            ps.setLong(paramIndex++, embedding.getId());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error updating brand embedding: " + e.getMessage());
            return false;
        }
    }

    public boolean delete(Long id) {
        String sql = "DELETE FROM brand_embeddings WHERE id = ?";
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.severe("Error deleting brand embedding: " + e.getMessage());
            return false;
        }
    }

    private BrandEmbedding mapResultSetToBrandEmbedding(ResultSet rs) throws SQLException {
        BrandEmbedding embedding = new BrandEmbedding();
        embedding.setId(rs.getLong("id"));
        embedding.setBrandId(rs.getLong("brand_id"));
        
        // Convert PostgreSQL vector to List<Double>
        Array embeddingArray = rs.getArray("embedding");
        if (embeddingArray != null) {
            Double[] vectorArray = (Double[]) embeddingArray.getArray();
            embedding.setEmbedding(new ArrayList<>(List.of(vectorArray)));
        }
        
        embedding.setSource(rs.getString("source"));
        embedding.setDescription(rs.getString("description"));
        
        Timestamp createdAt = rs.getTimestamp("created_at");
        if (createdAt != null) {
            embedding.setCreatedAt(createdAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        Timestamp updatedAt = rs.getTimestamp("updated_at");
        if (updatedAt != null) {
            embedding.setUpdatedAt(updatedAt.toInstant().atZone(java.time.ZoneId.systemDefault()));
        }
        
        return embedding;
    }
}
