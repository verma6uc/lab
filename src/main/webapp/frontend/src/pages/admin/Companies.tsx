import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import CompanyCard from '../../components/company/CompanyCard';
import CompanyDrawer from '../../components/company/CompanyDrawer';
import { Company, Industry } from '../../types/models';
import { companyService } from '../../services/company';
import { Business } from '@mui/icons-material';
import PageContainer from '../../components/admin/PageContainer';

// Helper function to format industry names
const formatIndustryName = (industry: string): string => {
  if (industry === 'ALL') return 'All Industries';
  
  // Convert SNAKE_CASE to Title Case
  return industry
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | 'ALL'>('ALL');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await companyService.getAll();
      if (Array.isArray(response)) {
        setCompanies(response);
        setFilteredCompanies(response);
      } else {
        setCompanies([]);
        setFilteredCompanies([]);
        setError('Invalid data format received from server');
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setError('Failed to fetch companies. Please try again later.');
      setCompanies([]);
      setFilteredCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (company: Company) => {
    console.log('Edit company:', company);
  };

  const handleViewClick = (company: Company) => {
    setSelectedCompany(company);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedCompany(null);
  };

  const handleAddClick = () => {
    console.log('Add new company');
  };

  const handleSearch = (value: string) => {
    const searchTerm = value.toLowerCase();
    const filtered = companies.filter(company => 
      company.name.toLowerCase().includes(searchTerm) ||
      company.description?.toLowerCase().includes(searchTerm) ||
      company.industry.toLowerCase().includes(searchTerm)
    );
    setFilteredCompanies(filtered);
  };

  const handleFilter = (value: string) => {
    const industry = value as Industry | 'ALL';
    setSelectedIndustry(industry);
    
    if (industry === 'ALL') {
      setFilteredCompanies(companies);
    } else {
      const filtered = companies.filter(company => company.industry === industry);
      setFilteredCompanies(filtered);
    }
  };

  // Create filter options from Industry enum with formatted names
  const filterOptions = ['ALL', ...Object.values(Industry)].map(industry => ({
    value: industry,
    label: formatIndustryName(industry)
  }));

  return (
    <PageContainer
      icon={<Business />}
      title="Companies"
      onSearch={handleSearch}
      onFilter={handleFilter}
      onAdd={handleAddClick}
      addButtonLabel="Add Company"
      filterOptions={filterOptions}
      searchPlaceholder="Search companies..."
    >
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress sx={{ color: 'primary.main' }} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      ) : filteredCompanies.length === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>No companies found.</Alert>
      ) : (
        <Grid container spacing={3}>
          {filteredCompanies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company.id}>
              <CompanyCard
                company={company}
                onEdit={handleEditClick}
                onView={() => handleViewClick(company)}
              />
            </Grid>
          ))}
        </Grid>
      )}
      
      <CompanyDrawer
        company={selectedCompany}
        open={drawerOpen}
        onClose={handleDrawerClose}
      />
    </PageContainer>
  );
};

export default Companies; 