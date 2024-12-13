import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
} from '@mui/material';
import CompanyCard from '../../components/company/CompanyCard';
import CompanyDrawer from '../../components/company/CompanyDrawer';
import DashboardCard from '../../components/company/DashboardCard';
import { Company } from '../../types/models';
import { companyService } from '../../services/company';
import ParticleBackground from '../../components/shared/ParticleBackground';
import { Business } from '@mui/icons-material';
import PageContainer from '../../components/admin/PageContainer';

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await companyService.getAll();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
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
    console.log('Search:', value);
  };

  const handleFilter = () => {
    console.log('Filter clicked');
  };

  return (
    <PageContainer
      icon={<Business />}
      title="Companies"
      onSearch={handleSearch}
      onFilter={handleFilter}
      onAdd={handleAddClick}
      addButtonLabel="Add Company"
      filterOptions={[
        'All Industries',
        'Technology',
        'Healthcare',
        'Finance',
      ]}
      searchPlaceholder="Search companies..."
    >
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress sx={{ color: 'primary.main' }} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {companies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company.companyId}>
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