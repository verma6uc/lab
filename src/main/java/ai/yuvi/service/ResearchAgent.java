package ai.yuvi.service;

import ai.yuvi.dao.CompanyDao;
import ai.yuvi.model.Company;
import ai.yuvi.config.DataSourceProvider;
import java.sql.SQLException;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.logging.Logger;

public class ResearchAgent {
    private static final Logger LOGGER = Logger.getLogger(ResearchAgent.class.getName());
    private final CompanyDao companyDao;

    public ResearchAgent() {
        this.companyDao = new CompanyDao(DataSourceProvider.getDataSource());
    }

    public Company performAdvancedResearch(String companyName, String websiteUrl, String contextName) throws SQLException {
        // Step 1: Confirm existence and get website
        CompanyExistenceResult existenceResult = confirmCompanyExistence(companyName, websiteUrl);

        if (!existenceResult.exists) {
            LOGGER.warning("Company not found or invalid: " + companyName);
            return null;
        }

        // Step 2: Check if company exists in DB
        Optional<Company> existingCompany = companyDao.findByName(companyName);
        Company company;

        if (!existingCompany.isPresent()) {
            // Create new company record
            company = new Company();
            company.setName(companyName);
            company.setWebsite(existenceResult.websiteUrl);
            company.setCreatedAt(OffsetDateTime.now().atZoneSameInstant(ZoneId.systemDefault()));
            company.setUpdatedAt(OffsetDateTime.now().atZoneSameInstant(ZoneId.systemDefault()));
            
            if (!companyDao.create(company)) {
                LOGGER.severe("Failed to create company record");
                return null;
            }
        } else {
            company = existingCompany.get();
        }

        // Step 3: Scrape website data
        String scrapedData = scrapeWebsiteData(company.getWebsite());
        if (scrapedData != null) {
            updateCompanyWithScrapedData(company, scrapedData);
            companyDao.update(company);
        }

        return company;
    }

    private CompanyExistenceResult confirmCompanyExistence(String companyName, String websiteUrl) {
        // TODO: Implement actual company existence check
        // For now, just return true if name is provided
        return new CompanyExistenceResult(companyName != null && !companyName.trim().isEmpty(), websiteUrl);
    }

    private String scrapeWebsiteData(String websiteUrl) {
        // TODO: Implement actual web scraping
        return null;
    }

    private void updateCompanyWithScrapedData(Company company, String scrapedData) {
        // TODO: Implement actual data extraction and company update
        company.setUpdatedAt(OffsetDateTime.now().atZoneSameInstant(ZoneId.systemDefault()));
    }

    private static class CompanyExistenceResult {
        boolean exists;
        String websiteUrl;
        CompanyExistenceResult(boolean exists, String websiteUrl) {
            this.exists = exists;
            this.websiteUrl = websiteUrl;
        }
    }
}
