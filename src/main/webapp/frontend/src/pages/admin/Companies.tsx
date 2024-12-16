import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import PageContainer from '../../components/shared/PageContainer';
import CompanyFilters from '../../components/admin/companies/CompanyFilters';
import CompanyCard from '../../components/admin/companies/CompanyCard';
import CompanyEditModal from '../../components/admin/companies/CompanyEditModal';
import StyledButton from '../../components/shared/StyledButton';
import { Add as AddIcon } from '@mui/icons-material';
import { Company } from '../../types/company';

const mockCompanies: Company[] = [
  {
    id: 1,
    name: 'TechCorp',
    industry: 'TECHNOLOGY',
    type: 'Enterprise',
    size: 500,
    bio: 'Leading technology solutions provider specializing in enterprise software.',
    website: 'https://techcorp.com',
    linkedin_url: 'https://linkedin.com/company/techcorp',
    twitter_url: 'https://twitter.com/techcorp',
    github_url: 'https://github.com/techcorp',
    contact_email: 'contact@techcorp.com',
    contact_phone: '+1 (555) 123-4567',
    contact_address: '123 Tech Street, San Francisco, CA',
    status: 'active',
    branding: {
      primary_color: '#00A3FF',
      secondary_color: '#2ecc71',
      font_family: 'Inter',
    },
    products: [
      { id: 1, name: 'TechCRM', description: 'Enterprise CRM Solution' },
      { id: 2, name: 'TechAnalytics', description: 'Business Intelligence Platform' },
    ],
    applications: [
      {
        id: 1,
        name: 'Sales Dashboard',
        description: 'Real-time sales analytics and reporting dashboard',
        stage: 'development',
        status: 'active',
        pending_approval: true,
        feedback_required: false,
        owner: {
          id: 1,
          name: 'John Doe',
          role: 'Product Owner'
        },
        last_updated: '2024-01-15T10:30:00Z',
        estimated_completion: '2024-02-15T00:00:00Z',
        created_at: '2024-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'Customer Portal',
        description: 'Self-service portal for customer account management',
        stage: 'visual_prd',
        status: 'active',
        pending_approval: false,
        feedback_required: true,
        owner: {
          id: 2,
          name: 'Jane Smith',
          role: 'Project Manager'
        },
        last_updated: '2024-01-14T15:45:00Z',
        estimated_completion: '2024-03-01T00:00:00Z',
        created_at: '2024-01-05T00:00:00Z'
      }
    ],
    created_at: '2024-01-15T00:00:00Z',
    products_count: 2,
    screenshots_count: 5,
  },
  {
    id: 2,
    name: 'BioMed Solutions',
    industry: 'HEALTHCARE',
    type: 'Startup',
    size: 50,
    bio: 'Innovative healthcare technology company focused on patient care solutions.',
    website: 'https://biomed.com',
    linkedin_url: 'https://linkedin.com/company/biomed',
    contact_email: 'info@biomed.com',
    contact_phone: '+1 (555) 987-6543',
    status: 'active',
    products: [
      { id: 3, name: 'PatientCare Pro', description: 'Healthcare Management System' },
    ],
    applications: [
      {
        id: 3,
        name: 'Patient Records',
        description: 'Electronic health records management system',
        stage: 'prototype',
        status: 'active',
        pending_approval: false,
        feedback_required: false,
        owner: {
          id: 3,
          name: 'Sarah Johnson',
          role: 'Product Manager'
        },
        last_updated: '2024-01-14T09:15:00Z',
        estimated_completion: '2024-03-15T00:00:00Z',
        created_at: '2024-01-14T00:00:00Z'
      }
    ],
    created_at: '2024-01-14T00:00:00Z',
    products_count: 1,
    screenshots_count: 3,
  },
  {
    id: 3,
    name: 'EcoEnergy',
    industry: 'ENERGY',
    size: 1000,
    bio: 'Sustainable energy solutions for a greener future.',
    website: 'https://ecoenergy.com',
    contact_email: 'contact@ecoenergy.com',
    status: 'inactive',
    products: [],
    applications: [
      {
        id: 4,
        name: 'Energy Monitor',
        description: 'Real-time energy consumption monitoring',
        stage: 'memory',
        status: 'inactive',
        pending_approval: false,
        feedback_required: true,
        owner: {
          id: 4,
          name: 'Mike Brown',
          role: 'Business Analyst'
        },
        last_updated: '2024-01-13T14:20:00Z',
        created_at: '2024-01-13T00:00:00Z'
      }
    ],
    created_at: '2024-01-13T00:00:00Z',
    products_count: 0,
    screenshots_count: 0,
  },
];

interface Filters {
  industry?: string;
  size?: string;
  status?: 'active' | 'inactive';
  hasProducts?: boolean;
  hasBranding?: boolean;
  sortBy: string;
}

const Companies: React.FC = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(mockCompanies);
  const [filters, setFilters] = useState<Filters>({
    sortBy: 'name',
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>();

  const handleSearch = (query: string) => {
    const searchResults = companies.filter(company => 
      company.name.toLowerCase().includes(query.toLowerCase()) ||
      company.industry.toLowerCase().includes(query.toLowerCase()) ||
      company.bio?.toLowerCase().includes(query.toLowerCase()) ||
      company.contact_email?.toLowerCase().includes(query.toLowerCase())
    );
    applyFilters(searchResults);
  };

  const applyFilters = (companies: Company[]) => {
    let filtered = [...companies];

    if (filters.industry) {
      filtered = filtered.filter(company => 
        company.industry === filters.industry
      );
    }

    if (filters.size) {
      const [min, max] = filters.size.split('-').map(n => parseInt(n));
      filtered = filtered.filter(company => {
        if (max) {
          return company.size >= min && company.size <= max;
        }
        return company.size >= min;
      });
    }

    if (filters.status) {
      filtered = filtered.filter(company => 
        company.status === filters.status
      );
    }

    if (filters.hasProducts) {
      filtered = filtered.filter(company => 
        company.products.length > 0
      );
    }

    if (filters.hasBranding) {
      filtered = filtered.filter(company => 
        company.branding !== undefined
      );
    }

    // Sort companies
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'created':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'size':
          return b.size - a.size;
        case 'industry':
          return a.industry.localeCompare(b.industry);
        default:
          return 0;
      }
    });

    setFilteredCompanies(filtered);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    applyFilters(companies);
  };

  const handleEdit = (id: number) => {
    const company = companies.find(c => c.id === id);
    setSelectedCompany(company);
    setEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const updatedCompanies = companies.filter(c => c.id !== id);
    setCompanies(updatedCompanies);
    applyFilters(updatedCompanies);
  };

  const handleStatusChange = (id: number) => {
    const updatedCompanies = companies.map(company => {
      if (company.id === id) {
        return {
          ...company,
          status: company.status === 'active' ? 'inactive' as const : 'active' as const,
        };
      }
      return company;
    });
    setCompanies(updatedCompanies);
    applyFilters(updatedCompanies);
  };

  const handleAddNew = () => {
    setSelectedCompany(undefined);
    setEditModalOpen(true);
  };

  const handleViewDetails = (id: number) => {
    navigate(`/admin/companies/${id}`);
  };

  return (
    <PageContainer>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ color: 'white', mb: 2, fontWeight: 600 }}>
            Companies
          </Typography>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Manage and monitor registered companies
          </Typography>
        </Box>

        <StyledButton
          buttonType="primary"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
        >
          Add New Company
        </StyledButton>
      </Box>

      <CompanyFilters
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        activeFilters={filters}
      />

      <Box sx={{ mt: 3 }}>
        <Box 
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {filteredCompanies.map(company => (
            <Box 
              key={company.id}
              onClick={() => handleViewDetails(company.id)}
              sx={{ 
                height: '100%',
                cursor: 'pointer',
              }}
            >
              <CompanyCard
                company={company}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {filteredCompanies.length === 0 && (
        <Box 
          sx={{ 
            textAlign: 'center',
            py: 8,
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <Typography variant="h6">
            No companies found matching your criteria
          </Typography>
          <Typography>
            Try adjusting your filters or search query
          </Typography>
        </Box>
      )}

      <CompanyEditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        company={selectedCompany}
      />
    </PageContainer>
  );
};

export default Companies;
