import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Box,
  IconButton,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import StyledTextField from '../../shared/StyledTextField';
import StyledSelect from '../../shared/StyledSelect';
import StyledButton from '../../shared/StyledButton';
import { Company } from '../../../types/company';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    sx={{ py: 3 }}
  >
    {value === index && children}
  </Box>
);

interface CompanyEditModalProps {
  open: boolean;
  onClose: () => void;
  company?: Company;
}

const INDUSTRIES = [
  'TECHNOLOGY',
  'HEALTHCARE',
  'FINANCE',
  'RETAIL',
  'MANUFACTURING',
  'EDUCATION',
  'ENTERTAINMENT',
  'REAL_ESTATE',
  'ENERGY',
  'TRANSPORTATION',
  'CONSULTING',
  'TELECOMMUNICATIONS',
  'AGRICULTURE',
  'CONSTRUCTION',
  'HOSPITALITY',
  'MEDIA',
  'AUTOMOTIVE',
  'AEROSPACE',
  'BIOTECHNOLOGY',
  'OTHER',
];

const initialFormData: Omit<Company, 'id'> = {
  name: '',
  industry: 'TECHNOLOGY',
  size: 0,
  status: 'active',
  products: [],
  applications: [],
  created_at: new Date().toISOString(),
  products_count: 0,
  screenshots_count: 0,
};

const CompanyEditModal: React.FC<CompanyEditModalProps> = ({
  open,
  onClose,
  company,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<Omit<Company, 'id'>>(company || initialFormData);

  const handleChange = (field: keyof Company, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBrandingChange = (field: keyof NonNullable<Company['branding']>, value: string) => {
    setFormData(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        [field]: value,
      },
    }));
  };

  const handleAddProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [
        ...prev.products,
        {
          id: Math.max(0, ...prev.products.map(p => p.id)) + 1,
          name: '',
          description: '',
        },
      ],
      products_count: prev.products_count + 1,
    }));
  };

  const handleEditProduct = (productId: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.map(product => 
        product.id === productId ? { ...product, [field]: value } : product
      ),
    }));
  };

  const handleDeleteProduct = (productId: number) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter(product => product.id !== productId),
      products_count: prev.products_count - 1,
    }));
  };

  const handleSave = () => {
    console.log('Save company:', formData);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'rgba(10, 25, 41, 0.95)',
          border: '1px solid rgba(0, 163, 255, 0.1)',
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
        }
      }}
    >
      <Box sx={{ 
        px: 3,
        py: 2,
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
          {company ? 'Edit Company' : 'Add New Company'}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ mt: 2 }}>
        <Tabs 
          value={activeTab} 
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            borderBottom: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            '& .MuiTab-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              '&.Mui-selected': {
                color: '#00A3FF',
              },
            },
            '& .MuiTabs-indicator': {
              bgcolor: '#00A3FF',
            },
          }}
        >
          <Tab label="Basic Info" />
          <Tab label="Contact & Social" />
          <Tab label="Branding" />
          <Tab label="Products" />
          <Tab label="Applications" />
        </Tabs>

        {/* Basic Info */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Company Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledSelect
                label="Industry"
                value={formData.industry}
                onChange={(value) => handleChange('industry', value)}
                options={INDUSTRIES.map(industry => ({
                  value: industry,
                  label: industry.charAt(0) + industry.slice(1).toLowerCase().replace('_', ' '),
                }))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Company Type"
                value={formData.type || ''}
                onChange={(e) => handleChange('type', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                type="number"
                label="Company Size"
                value={formData.size}
                onChange={(e) => handleChange('size', parseInt(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                multiline
                rows={3}
                label="Bio"
                value={formData.bio || ''}
                onChange={(e) => handleChange('bio', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={formData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Contact & Social */}
        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Website"
                value={formData.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="LinkedIn URL"
                value={formData.linkedin_url || ''}
                onChange={(e) => handleChange('linkedin_url', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Twitter URL"
                value={formData.twitter_url || ''}
                onChange={(e) => handleChange('twitter_url', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="GitHub URL"
                value={formData.github_url || ''}
                onChange={(e) => handleChange('github_url', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Contact Email"
                value={formData.contact_email || ''}
                onChange={(e) => handleChange('contact_email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Contact Phone"
                value={formData.contact_phone || ''}
                onChange={(e) => handleChange('contact_phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledTextField
                fullWidth
                multiline
                rows={2}
                label="Contact Address"
                value={formData.contact_address || ''}
                onChange={(e) => handleChange('contact_address', e.target.value)}
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Branding */}
        <TabPanel value={activeTab} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Logo URL"
                value={formData.logo_url || ''}
                onChange={(e) => handleChange('logo_url', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Primary Color"
                value={formData.branding?.primary_color || ''}
                onChange={(e) => handleBrandingChange('primary_color', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Secondary Color"
                value={formData.branding?.secondary_color || ''}
                onChange={(e) => handleBrandingChange('secondary_color', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledTextField
                fullWidth
                label="Font Family"
                value={formData.branding?.font_family || ''}
                onChange={(e) => handleBrandingChange('font_family', e.target.value)}
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Products */}
        <TabPanel value={activeTab} index={3}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <StyledButton
              buttonType="primary"
              startIcon={<AddIcon />}
              onClick={handleAddProduct}
            >
              Add Product
            </StyledButton>
          </Box>
          <List>
            {formData.products.map((product, index) => (
              <React.Fragment key={product.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <StyledTextField
                        fullWidth
                        label="Product Name"
                        value={product.name}
                        onChange={(e) => handleEditProduct(product.id, 'name', e.target.value)}
                        sx={{ mb: 1 }}
                      />
                    }
                    secondary={
                      <StyledTextField
                        fullWidth
                        multiline
                        rows={2}
                        label="Product Description"
                        value={product.description || ''}
                        onChange={(e) => handleEditProduct(product.id, 'description', e.target.value)}
                      />
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end"
                      sx={{ color: '#ff6347' }}
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < (formData.products.length - 1) && (
                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                )}
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        {/* Applications */}
        <TabPanel value={activeTab} index={4}>
          <List>
            {formData.applications.map((app, index) => (
              <React.Fragment key={app.id}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography sx={{ color: 'white' }}>
                        {app.name}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
                        <Typography 
                          component="span" 
                          sx={{ 
                            color: app.status === 'active' ? '#2ecc71' : '#ff6347',
                            fontSize: '0.875rem',
                          }}
                        >
                          {app.status}
                        </Typography>
                        <Typography 
                          component="span" 
                          sx={{ 
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: '0.875rem',
                          }}
                        >
                          Created {new Date(app.created_at).toLocaleDateString()}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end"
                      sx={{ color: '#00A3FF' }}
                      onClick={() => {/* Handle view application */}}
                    >
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < (formData.applications.length - 1) && (
                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                )}
              </React.Fragment>
            ))}
          </List>
        </TabPanel>
      </DialogContent>

      <DialogActions sx={{ 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        p: 2.5,
      }}>
        <StyledButton buttonType="secondary" onClick={onClose}>
          Cancel
        </StyledButton>
        <StyledButton buttonType="primary" onClick={handleSave}>
          Save Changes
        </StyledButton>
      </DialogActions>
    </Dialog>
  );
};

export default CompanyEditModal;
