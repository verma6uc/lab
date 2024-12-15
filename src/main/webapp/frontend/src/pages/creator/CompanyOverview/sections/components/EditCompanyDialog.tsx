import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
} from '@mui/material';
import { Company, Industry } from '../../../../../types/models';

interface EditCompanyDialogProps {
  open: boolean;
  onClose: () => void;
  company: Company;
  onSave: (updatedCompany: Partial<Company>) => void;
}

const EditCompanyDialog: React.FC<EditCompanyDialogProps> = ({ open, onClose, company, onSave }) => {
  const [formData, setFormData] = useState({
    companyName: company.name || '',
    type: company.type || '',
    description: company.description || '',
    bio: company.bio || '',
    industry: company.industry || Industry.TECHNOLOGY,
    website: company.website || '',
    contactEmail: company.email || '',
    contactPhone: company.phone || '',
    contactAddress: company.location || '',
    size: company.size || 0,
    linkedinUrl: company.linkedinUrl || '',
    twitterUrl: company.twitterUrl || '',
    githubUrl: company.githubUrl || '',
    logoUrl: company.logoUrl || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name as string]: value }));
  };

  const handleSubmit = () => {
    onSave({
      name: formData.companyName,
      type: formData.type,
      description: formData.description,
      bio: formData.bio,
      industry: formData.industry as Industry,
      website: formData.website,
      email: formData.contactEmail,
      phone: formData.contactPhone,
      location: formData.contactAddress,
      size: Number(formData.size),
      linkedinUrl: formData.linkedinUrl,
      twitterUrl: formData.twitterUrl,
      githubUrl: formData.githubUrl,
      logoUrl: formData.logoUrl,
    });
    onClose();
  };

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.12)',
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.2)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6200EA',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
    '& .MuiInputBase-input': {
      color: 'common.white',
    },
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'rgba(22, 28, 36, 0.95)',
          backgroundImage: 'none',
          boxShadow: '0 0 24px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        },
      }}
    >
      <DialogTitle sx={{ color: 'common.white' }}>Edit Company Information</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              variant="outlined"
              sx={textFieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              variant="outlined"
              sx={textFieldSx}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              variant="outlined"
              sx={textFieldSx}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              multiline
              rows={2}
              variant="outlined"
              sx={textFieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              variant="outlined"
              sx={textFieldSx}
            >
              {Object.values(Industry).map((industry) => (
                <MenuItem key={industry} value={industry}>
                  {industry.replace(/_/g, ' ')}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company Size"
              name="size"
              type="number"
              value={formData.size}
              onChange={handleChange}
              variant="outlined"
              sx={textFieldSx}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              variant="outlined"
              sx={textFieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              variant="outlined"
              sx={textFieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Phone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              variant="outlined"
              sx={textFieldSx}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Address"
              name="contactAddress"
              value={formData.contactAddress}
              onChange={handleChange}
              variant="outlined"
              sx={textFieldSx}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Logo URL"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleChange}
              variant="outlined"
              sx={textFieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="LinkedIn URL"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              variant="outlined"
              sx={textFieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Twitter URL"
              name="twitterUrl"
              value={formData.twitterUrl}
              onChange={handleChange}
              variant="outlined"
              sx={textFieldSx}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="GitHub URL"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              variant="outlined"
              sx={textFieldSx}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button 
          onClick={onClose}
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.05)',
            },
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          sx={{
            bgcolor: '#6200EA',
            '&:hover': {
              bgcolor: '#651FFF',
            },
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCompanyDialog; 