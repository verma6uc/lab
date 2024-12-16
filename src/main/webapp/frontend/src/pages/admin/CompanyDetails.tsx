import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import CompanyOverview from '../../components/admin/companies/details/CompanyOverview';
import CompanyMetrics from '../../components/admin/companies/details/CompanyMetrics';
import CompanyApplications from '../../components/admin/companies/details/CompanyApplications';
import CompanySpaces from '../../components/admin/companies/details/CompanySpaces';
import CompanyUsers from '../../components/admin/companies/details/CompanyUsers';
import { Company } from '../../types/company';
import { UserRole, UserStatus } from '../../types/user';
import { SpaceType } from '../../types/space';

const CompanyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState<number | null>(null);

  // TODO: Replace with actual data fetching
  const company: Company = {
    id: 1,
    name: 'Acme Corporation',
    industry: 'Technology',
    description: 'Leading provider of innovative solutions',
    size: 'Enterprise',
    status: 'Active',
    type: 'Corporation',
    products: ['Product A', 'Product B'],
    created_at: '2023-01-01',
    updated_at: '2023-06-15',
    website: 'https://acme.com',
    logo_url: '/images/acme-logo.png',
    contact_email: 'contact@acme.com',
    contact_phone: '+1 (555) 123-4567',
    contact_address: '123 Tech Street, Silicon Valley, CA',
    bio: 'Acme Corporation is a leading technology company...',
    branding: {
      primary_color: '#00A3FF',
      secondary_color: '#0066CC',
      logo_url: '/images/acme-logo.png',
    },
    metrics: {
      totalUsers: 1000,
      activeUsers: 750,
      totalRevenue: 1000000,
      monthlyGrowth: 15,
      userGrowth: 10,
      revenueGrowth: 20,
      products_count: 5,
      screenshots_count: 25,
    },
    applications: [
      {
        id: 1,
        name: 'Sales Dashboard',
        description: 'Real-time sales analytics and reporting dashboard',
        stage: 'memory',
        status: 'In Development',
      },
      {
        id: 2,
        name: 'Customer Portal',
        description: 'Self-service portal for customer account management',
        stage: 'blueprint',
        status: 'Planning',
      },
    ],
    spaces: [
      {
        id: 1,
        name: 'Marketing',
        type: SpaceType.DEPARTMENT,
        status: 'Active',
        created_at: '2023-01-01',
        description: 'Marketing department responsible for brand and campaigns',
        attributes: {
          member_count: 15,
          manager: 'Jane Smith',
          budget: 500000
        }
      },
      {
        id: 2,
        name: 'Sales',
        type: SpaceType.DEPARTMENT,
        status: 'Active',
        created_at: '2023-01-01',
        description: 'Sales department driving revenue growth',
        attributes: {
          member_count: 25,
          manager: 'John Doe',
          budget: 750000
        }
      },
      {
        id: 3,
        name: 'Team Alpha',
        type: SpaceType.TEAM,
        status: 'Active',
        created_at: '2023-01-01',
        description: 'Elite sales team focused on enterprise clients',
        parent: 2,
        attributes: {
          member_count: 8,
          manager: 'Alice Johnson',
          budget: 250000
        }
      },
    ],
    users: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        designation: 'Senior Manager',
        department: 'Sales',
        lastActive: '2023-06-15T10:30:00Z',
        avatar_url: '/images/avatars/john.jpg',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: UserRole.CREATOR,
        status: UserStatus.ACTIVE,
        designation: 'Team Lead',
        department: 'Marketing',
        lastActive: '2023-06-15T09:45:00Z',
        avatar_url: '/images/avatars/jane.jpg',
      },
    ],
  };

  const handleEditCompany = () => {
    // TODO: Implement edit company logic
    console.log('Edit company:', company.id);
  };

  const handleAddApplication = () => {
    setSelectedApplicationId(null);
    setEditModalOpen(true);
  };

  const handleEditApplication = (id: number) => {
    setSelectedApplicationId(id);
    setEditModalOpen(true);
  };

  const handleDeleteApplication = (id: number) => {
    // TODO: Implement delete application logic
    console.log('Delete application:', id);
  };

  const handleAddSpace = () => {
    // TODO: Implement add space logic
    console.log('Add space');
  };

  const handleEditSpace = (id: number) => {
    // TODO: Implement edit space logic
    console.log('Edit space:', id);
  };

  const handleDeleteSpace = (id: number) => {
    // TODO: Implement delete space logic
    console.log('Delete space:', id);
  };

  const handleAddUser = () => {
    // TODO: Implement add user logic
    console.log('Add user');
  };

  const handleEditUser = (id: number) => {
    // TODO: Implement edit user logic
    console.log('Edit user:', id);
  };

  const handleDeleteUser = (id: number) => {
    // TODO: Implement delete user logic
    console.log('Delete user:', id);
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CompanyOverview
            company={company}
            onEdit={handleEditCompany}
          />
        </Grid>

        <Grid item xs={12}>
          <CompanyMetrics
            {...company.metrics}
            company={company}
          />
        </Grid>

        <Grid item xs={12}>
          <CompanyApplications
            companyId={id || ''}
            applications={company.applications}
            onAddApplication={handleAddApplication}
            onEditApplication={handleEditApplication}
            onDeleteApplication={handleDeleteApplication}
          />
        </Grid>

        <Grid item xs={12}>
          <CompanySpaces
            spaces={company.spaces}
            onAddSpace={handleAddSpace}
            onEditSpace={handleEditSpace}
            onDeleteSpace={handleDeleteSpace}
          />
        </Grid>

        <Grid item xs={12}>
          <CompanyUsers
            users={company.users}
            onAddUser={handleAddUser}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyDetails;
