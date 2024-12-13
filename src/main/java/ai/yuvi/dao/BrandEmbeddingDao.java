package ai.yuvi.dao;

import ai.yuvi.model.BrandEmbedding;
import ai.yuvi.config.DataSourceProvider;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

public class BrandEmbeddingDao {
    private static final Logger LOGGER = Logger.getLogger(BrandEmbeddingDao.class.getName());
    private static final int VECTOR_DIMENSION = 768;

    public boolean create(BrandEmbedding embedding) {
        String sql = """
            INSERT INTO brand_embedding (company_id, embedding_vector)
            VALUES (?, ?::vector)
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, embedding.getCompanyId());
            stmt.setString(2, vectorToString(embedding.getEmbeddingVector()));

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error creating brand embedding", e);
            return false;
        }
    }

    public Optional<BrandEmbedding> findByCompanyId(Long companyId) {
        String sql = """
            SELECT company_id, embedding_vector, updated_at
            FROM brand_embedding 
            WHERE company_id = ?
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, companyId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapResultSetToEmbedding(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error finding brand embedding by company ID", e);
        }
        return Optional.empty();
    }

    public List<BrandEmbedding> findSimilar(double[] queryVector, int limit) {
        String sql = """
            SELECT company_id, embedding_vector, updated_at,
                   1 - (embedding_vector <=> ?::vector) as similarity
            FROM brand_embedding
            ORDER BY similarity DESC
            LIMIT ?
        """;

        List<BrandEmbedding> embeddings = new ArrayList<>();
        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, vectorToString(queryVector));
            stmt.setInt(2, limit);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    embeddings.add(mapResultSetToEmbedding(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error finding similar brand embeddings", e);
        }
        return embeddings;
    }

    public boolean update(BrandEmbedding embedding) {
        String sql = """
            UPDATE brand_embedding 
            SET embedding_vector = ?::vector,
                updated_at = NOW()
            WHERE company_id = ?
        """;

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, vectorToString(embedding.getEmbeddingVector()));
            stmt.setLong(2, embedding.getCompanyId());

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error updating brand embedding", e);
            return false;
        }
    }

    public boolean delete(Long companyId) {
        String sql = "DELETE FROM brand_embedding WHERE company_id = ?";

        try (Connection conn = DataSourceProvider.getDataSource().getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setLong(1, companyId);
            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Error deleting brand embedding", e);
            return false;
        }
    }

    private BrandEmbedding mapResultSetToEmbedding(ResultSet rs) throws SQLException {
        BrandEmbedding embedding = new BrandEmbedding();
        embedding.setCompanyId(rs.getLong("company_id"));
        embedding.setEmbeddingVector(parseVector(rs.getString("embedding_vector")));
        embedding.setUpdatedAt(rs.getObject("updated_at", Timestamp.class).toInstant().atZone(java.time.ZoneId.systemDefault()));
        return embedding;
    }

    private String vectorToString(double[] vector) {
        if (vector == null || vector.length != VECTOR_DIMENSION) {
            throw new IllegalArgumentException("Vector must have dimension " + VECTOR_DIMENSION);
        }
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < vector.length; i++) {
            if (i > 0) sb.append(",");
            sb.append(vector[i]);
        }
        sb.append("]");
        return sb.toString();
    }

    private double[] parseVector(String vectorStr) {
        // Remove brackets and split by comma
        String[] parts = vectorStr.substring(1, vectorStr.length() - 1).split(",");
        double[] vector = new double[parts.length];
        for (int i = 0; i < parts.length; i++) {
            vector[i] = Double.parseDouble(parts[i].trim());
        }
        return vector;
    }
}
