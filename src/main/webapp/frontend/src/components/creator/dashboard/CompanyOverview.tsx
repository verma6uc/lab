import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Skeleton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { Company, Industry } from '../../../types/models';

interface EditCompanyDialogProps {
  open: boolean;
  onClose: () => void;
  company: Company;
  onSave: (updatedCompany: Partial<Company>) => void;
}

const EditCompanyDialog: React.FC<EditCompanyDialogProps> = ({
  open,
  onClose,
  company,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Company>>(company);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Company Information</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Company Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <TextField
            select
            fullWidth
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
          >
            {Object.values(Industry).map((industry) => (
              <MenuItem key={industry} value={industry}>
                {industry.replace(/_/g, ' ')}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Company Size"
            name="size"
            type="number"
            value={formData.size}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
};

const CompanyOverview = () => {
  const [loading] = useState(false);
  const [company] = useState<Company>({
    id: 1,
    name: "TechCorp Solutions",
    description: "Leading provider of AI-powered enterprise solutions, focused on delivering innovative technology that transforms businesses.",
    industry: Industry.TECHNOLOGY,
    website: "https://techcorp.example.com",
    email: "contact@techcorp.example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    size: 150,
    linkedinUrl: "https://linkedin.com/company/techcorp",
    twitterUrl: "https://twitter.com/techcorp",
    githubUrl: "https://github.com/techcorp",
    logoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleSave = (updatedCompany: Partial<Company>) => {
    console.log('Save company:', updatedCompany);
    // TODO: Implement API call to save company changes
  };

  if (loading) {
    return (
      <Card
        sx={{
          p: 3,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Skeleton variant="circular" width={80} height={80} sx={{ mr: 2 }} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="text" width="40%" height={24} />
          </Box>
        </Box>
        <Skeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Skeleton variant="text" height={24} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Skeleton variant="text" height={24} />
          </Grid>
        </Grid>
      </Card>
    );
  }

  return (
    <>
      <Card
        sx={{
          p: 3,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        {/* Header with Company Logo and Basic Info */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
          <Avatar
            src={company.logoUrl}
            sx={{
              width: 80,
              height: 80,
              mr: 2,
              bgcolor: 'primary.main',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            <BusinessIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography
                variant="h4"
                className="gradient-text"
                sx={{
                  fontWeight: 600,
                  mr: 2,
                }}
              >
                {company.name}
              </Typography>
              <IconButton
                onClick={handleEdit}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => console.log('Navigate to company details')}
                sx={{
                  ml: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                <OpenInNewIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label={company.industry.replace(/_/g, ' ')}
                sx={{
                  bgcolor: 'rgba(33, 150, 243, 0.1)',
                  color: '#2196F3',
                  borderRadius: '8px',
                  '& .MuiChip-label': { px: 2 },
                }}
              />
              <Chip
                icon={<PeopleIcon sx={{ fontSize: 16 }} />}
                label={`${company.size} employees`}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  '& .MuiChip-label': { px: 2 },
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Company Description */}
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 3,
            lineHeight: 1.6,
          }}
        >
          {company.description}
        </Typography>

        {/* Contact Information Grid */}
        <Grid container spacing={2}>
          {company.email && (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {company.email}
                </Typography>
              </Box>
            </Grid>
          )}
          {company.phone && (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {company.phone}
                </Typography>
              </Box>
            </Grid>
          )}
          {company.location && (
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {company.location}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Social Links */}
        <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Grid container spacing={2}>
            {company.linkedinUrl && (
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  href={company.linkedinUrl}
                  target="_blank"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'rgba(33, 150, 243, 0.1)',
                    },
                  }}
                >
                  LinkedIn
                </Button>
              </Grid>
            )}
            {company.twitterUrl && (
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  href={company.twitterUrl}
                  target="_blank"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'rgba(33, 150, 243, 0.1)',
                    },
                  }}
                >
                  Twitter
                </Button>
              </Grid>
            )}
            {company.githubUrl && (
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  href={company.githubUrl}
                  target="_blank"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'rgba(33, 150, 243, 0.1)',
                    },
                  }}
                >
                  GitHub
                </Button>
              </Grid>
            )}
          </Grid>
        </Box>
      </Card>

      <EditCompanyDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        company={company}
        onSave={handleSave}
      />
    </>
  );
};

export default CompanyOverview; 