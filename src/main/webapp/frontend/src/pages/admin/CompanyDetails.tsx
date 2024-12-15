import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Box, Divider } from '@mui/material';
import PageContainer from '../../components/shared/PageContainer';
import CompanyOverview from '../../components/admin/companies/details/CompanyOverview';
import CompanyMetrics from '../../components/admin/companies/details/CompanyMetrics';
import BrandAttributes from '../../components/admin/companies/details/BrandAttributes';
import CompanyApplications from '../../components/admin/companies/details/CompanyApplications';
import CompanyProducts from '../../components/admin/companies/details/CompanyProducts';
import CompanyUsers from '../../components/admin/companies/details/CompanyUsers';
import CompanySpaces from '../../components/admin/companies/details/CompanySpaces';
import CompanyInsights from '../../components/admin/companies/details/CompanyInsights';
import CompanyEditModal from '../../components/admin/companies/CompanyEditModal';
import { Company } from '../../types/company';
import { CompanyUser } from '../../types/user';

// Mock data for testing
const mockCompany: Company = {
  id: 1,
  name: 'TechCorp',
  industry: 'TECHNOLOGY',
  type: 'Enterprise',
  size: 500,
  bio: 'Leading technology solutions provider specializing in enterprise software.',
  description: 'Detailed description of the company and its mission...',
  website: 'https://techcorp.com',
  linkedin_url: 'https://linkedin.com/company/techcorp',
  twitter_url: 'https://twitter.com/techcorp',
  github_url: 'https://github.com/techcorp',
  contact_email: 'contact@techcorp.com',
  contact_phone: '+1 (555) 123-4567',
  contact_address: '123 Tech Street, San Francisco, CA',
  logo_url: '',
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
    },
    {
      id: 3,
      name: 'Mobile App',
      description: 'Native mobile application for field sales team',
      stage: 'blueprint',
      status: 'active',
      pending_approval: false,
      feedback_required: false,
      owner: {
        id: 3,
        name: 'Bob Wilson',
        role: 'Technical Lead'
      },
      last_updated: '2024-01-13T09:20:00Z',
      estimated_completion: '2024-04-15T00:00:00Z',
      created_at: '2024-01-10T00:00:00Z'
    }
  ],
  created_at: '2024-01-15T00:00:00Z',
  products_count: 2,
  screenshots_count: 5,
};

// Mock users data
const mockUsers: CompanyUser[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@techcorp.com',
    role: 'ADMIN',
    status: 'active',
    last_active: '2024-01-15T00:00:00Z',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@techcorp.com',
    role: 'CREATOR',
    status: 'active',
    last_active: '2024-01-14T00:00:00Z',
  },
  {
    id: 3,
    name: 'Bob Wilson',
    email: 'bob@techcorp.com',
    role: 'USER',
    status: 'inactive',
    last_active: '2024-01-13T00:00:00Z',
  },
];

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <Box sx={{ mb: 3, mt: 4 }}>
    <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
      {title}
    </Typography>
    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
  </Box>
);

const CompanyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<Company>(mockCompany);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Company handlers
  const handleEditCompany = () => {
    setEditModalOpen(true);
  };

  // Product handlers
  const handleEditProduct = (productId: number) => {
    // Implement edit product logic
  };

  const handleDeleteProduct = (productId: number) => {
    // Implement delete product logic
  };

  // Application handlers
  const handleEditApplication = (appId: number) => {
    // Implement edit application logic
  };

  const handleViewApplication = (appId: number) => {
    // Implement view application logic
  };

  // User handlers
  const handleAddUser = () => {
    // Implement add user logic
  };

  const handleEditUser = (userId: number) => {
    // Implement edit user logic
  };

  const handleToggleUserStatus = (userId: number) => {
    // Implement toggle user status logic
  };

  // Space handlers
  const handleEditSpace = (spaceId: number) => {
    // Implement edit space logic
  };

  const handleAddSpace = (parentId?: number) => {
    // Implement add space logic
  };

  // Insights handlers
  const handleRefreshEmbeddings = () => {
    // Implement refresh embeddings logic
  };

  const handleViewCompetitors = () => {
    // Implement view competitors logic
  };

  return (
    <PageContainer>
      {/* Core Information */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <CompanyOverview 
            company={company}
            onEdit={handleEditCompany}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <CompanyMetrics company={company} />
        </Grid>
      </Grid>

      {/* Product & Development */}
      <SectionHeader title="Product & Development" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CompanyApplications 
            company={company}
            onEditApplication={handleEditApplication}
            onViewApplication={handleViewApplication}
          />
        </Grid>
        <Grid item xs={12}>
          <CompanyProducts 
            company={company}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        </Grid>
      </Grid>

      {/* Organization & Access */}
      <SectionHeader title="Organization & Access" />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <CompanySpaces 
            company={company}
            onEditSpace={handleEditSpace}
            onAddSpace={handleAddSpace}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <CompanyUsers 
            users={mockUsers}
            onAddUser={handleAddUser}
            onEditUser={handleEditUser}
            onToggleUserStatus={handleToggleUserStatus}
          />
        </Grid>
      </Grid>

      {/* Brand & Market */}
      <SectionHeader title="Brand & Market" />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <BrandAttributes 
            company={company}
            onEdit={handleEditCompany}
          />
        </Grid>
        <Grid item xs={12} lg={8}>
          <CompanyInsights 
            company={company}
            onRefreshEmbeddings={handleRefreshEmbeddings}
            onViewCompetitors={handleViewCompetitors}
          />
        </Grid>
      </Grid>

      {/* Edit Modal */}
      <CompanyEditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        company={company}
      />
    </PageContainer>
  );
};

export default CompanyDetails;
