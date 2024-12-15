import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Typography,
} from '@mui/material';
import { Apps as AppsIcon } from '@mui/icons-material';
import { Company, Brand, Industry } from '../../../../types/models';
import CompanyHeader from './components/CompanyHeader';
import CompanyDescription from './components/CompanyDescription';
import BrandAttributes from './components/BrandAttributes';
import ApplicationsOverview from './components/ApplicationsOverview';
import ContactInformation from './components/ContactInformation';
import EditCompanyDialog from './components/EditCompanyDialog';

// Mock data - replace with actual data fetching
const mockCompany: Company = {
  id: 1,
  name: "TechCorp Solutions",
  type: "enterprise",
  description: "Leading provider of AI-powered product development solutions, helping businesses transform their ideas into reality through innovative technology and strategic guidance.",
  bio: "Transforming ideas into reality through AI-powered innovation.",
  industry: Industry.TECHNOLOGY,
  website: "https://techcorp.example.com",
  email: "contact@techcorp.example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  size: 156,
  linkedinUrl: "https://linkedin.com/company/techcorp",
  twitterUrl: "https://twitter.com/techcorp",
  githubUrl: "https://github.com/techcorp",
  logoUrl: "https://via.placeholder.com/150",
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Mock brand data
const mockBrand: Brand = {
  colors: "#6200EA,#651FFF",
  typography: "Inter, Roboto",
  logoGuidelines: "Use primary logo on light backgrounds",
  voiceAndTone: "Professional yet approachable",
  brandValues: "Innovation, Reliability, Customer-Focus",
};

// Mock products data with stages
const mockProducts = [
  {
    id: 1,
    name: "AI Product Assistant",
    description: "AI-powered product development and management tool",
    features: "Natural language processing, Real-time collaboration, Automated documentation",
    targetAudience: "Product managers, Development teams, Business analysts",
    useCases: "Product planning, Feature development, Sprint management",
    type: "SaaS",
    status: "active",
    productUrl: "https://product-assistant.example.com",
    documentationUrl: "https://docs.product-assistant.example.com",
    apiUrl: "https://api.product-assistant.example.com",
    companyId: 1,
    launchDate: new Date("2023-01-15"),
    createdAt: new Date(),
    updatedAt: new Date(),
    stages: {
      MEMORY: 100,
      BLUEPRINT: 100,
      VISUAL_PRD: 85,
      PROTOTYPE: 60,
      DEVELOPMENT: 30,
      LAUNCH: 0
    }
  },
  {
    id: 2,
    name: "Design System Generator",
    description: "Automated design system creation and management",
    features: "Component library, Theme customization, Design token management",
    targetAudience: "UI/UX designers, Frontend developers",
    useCases: "Design system creation, Component development, Brand consistency",
    type: "SaaS",
    status: "beta",
    productUrl: "https://design-system.example.com",
    documentationUrl: "https://docs.design-system.example.com",
    apiUrl: "https://api.design-system.example.com",
    companyId: 1,
    launchDate: new Date("2023-06-01"),
    createdAt: new Date(),
    updatedAt: new Date(),
    stages: {
      MEMORY: 100,
      BLUEPRINT: 100,
      VISUAL_PRD: 100,
      PROTOTYPE: 90,
      DEVELOPMENT: 70,
      LAUNCH: 20
    }
  },
];

const CompanyIdentity = () => {
  const { companyId } = useParams();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isEditBrandDialogOpen, setIsEditBrandDialogOpen] = useState(false);

  const handleSave = (updatedCompany: Partial<Company>) => {
    console.log('Saving company updates:', updatedCompany);
    // TODO: Implement actual save functionality
  };

  const handleBrandSave = (updatedBrand: Partial<Brand>) => {
    console.log('Saving brand updates:', updatedBrand);
    // TODO: Implement actual save functionality
  };

  const handleAddProduct = () => {
    console.log('Adding new product');
    // TODO: Implement add product functionality
  };

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <CardContent>
        <CompanyHeader 
          company={mockCompany}
          onEdit={() => setIsEditDialogOpen(true)}
        />

        <CompanyDescription company={mockCompany} />

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', my: 2 }} />

        <BrandAttributes
          brand={mockBrand}
          onEdit={() => setIsEditBrandDialogOpen(true)}
        />

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', my: 2 }} />

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'common.white' }}>
              Applications
            </Typography>
            <Button
              component={Link}
              to={`/creator/companies/${companyId}/applications`}
              variant="outlined"
              startIcon={<AppsIcon />}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'rgba(33, 150, 243, 0.1)',
                },
              }}
            >
              View All Applications
            </Button>
          </Box>
          <ApplicationsOverview
            products={mockProducts}
            onAddProduct={handleAddProduct}
          />
        </Box>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.08)', my: 2 }} />

        <ContactInformation company={mockCompany} />
      </CardContent>

      <EditCompanyDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        company={mockCompany}
        onSave={handleSave}
      />
    </Card>
  );
};

export default CompanyIdentity; 