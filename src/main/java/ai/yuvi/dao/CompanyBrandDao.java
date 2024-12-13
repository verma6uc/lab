package ai.yuvi.dao;

import ai.yuvi.model.CompanyBrand;
import ai.yuvi.util.DbUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class CompanyBrandDao {

    public void upsertCompanyBrand(CompanyBrand brand) throws SQLException {
        String sql = "INSERT INTO company_brand (company_id, primary_color, secondary_color, font_family, logo_url) "
                   + "VALUES (?, ?, ?, ?, ?) "
                   + "ON CONFLICT (company_id) DO UPDATE SET primary_color=EXCLUDED.primary_color, "
                   + "secondary_color=EXCLUDED.secondary_color, font_family=EXCLUDED.font_family, logo_url=EXCLUDED.logo_url";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, brand.getCompanyId());
            ps.setString(2, brand.getPrimaryColor());
            ps.setString(3, brand.getSecondaryColor());
            ps.setString(4, brand.getFontFamily());
            ps.setString(5, brand.getLogoUrl());
            ps.executeUpdate();
        }
    }

    public CompanyBrand findByCompanyId(long companyId) throws SQLException {
        String sql = "SELECT company_id, primary_color, secondary_color, font_family, logo_url FROM company_brand WHERE company_id = ?";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    CompanyBrand cb = new CompanyBrand();
                    cb.setCompanyId(rs.getLong("company_id"));
                    cb.setPrimaryColor(rs.getString("primary_color"));
                    cb.setSecondaryColor(rs.getString("secondary_color"));
                    cb.setFontFamily(rs.getString("font_family"));
                    cb.setLogoUrl(rs.getString("logo_url"));
                    return cb;
                }
            }
        }
        return null;
    }

	 public void upsertCompanyBrand(long companyId, String primaryColor, String secondaryColor, String fontFamily, String logoUrl) throws SQLException {
        String sql = "INSERT INTO company_brand (company_id, primary_color, secondary_color, font_family, logo_url) "
                   + "VALUES (?, ?, ?, ?, ?) "
                   + "ON CONFLICT (company_id) DO UPDATE SET primary_color=EXCLUDED.primary_color, secondary_color=EXCLUDED.secondary_color, font_family=EXCLUDED.font_family, logo_url=EXCLUDED.logo_url";
        try (Connection conn = DbUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setLong(1, companyId);
            ps.setString(2, primaryColor);
            ps.setString(3, secondaryColor);
            ps.setString(4, fontFamily);
            ps.setString(5, logoUrl);
            ps.executeUpdate();
        }
    }
}
