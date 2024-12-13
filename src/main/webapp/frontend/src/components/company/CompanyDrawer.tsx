import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  useTheme,
  Tabs,
  Tab,
  Badge,
  Grid,
  CircularProgress
} from '@mui/material';
import {
  Close as CloseIcon,
  Language as WebsiteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  Description as DescriptionIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
  Style as BrandIcon,
  Inventory as ProductIcon,
  Palette as UIIcon,
  CompareArrows as CompetitorIcon,
  Science as ResearchIcon,
  Group as TeamIcon,
  Person as UserIcon
} from '@mui/icons-material';
import { Company } from '../../types/models';
import { companyService } from '../../services/company';
import ProductsTab from './tabs/ProductsTab';
import UIArchetypesTab from './tabs/UIArchetypesTab';
import CompetitorsTab from './tabs/CompetitorsTab';
import ResearchTab from './tabs/ResearchTab';
import UsersTab from './tabs/UsersTab';
import CompanyHeader from './CompanyHeader';

interface CompanyDrawerProps {
  company: Company | null;
  open: boolean;
  onClose: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`company-tabpanel-${index}`}
      aria-labelledby={`company-tab-${index}`}
      {...other}
      style={{ height: '100%', overflow: 'auto' }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const CompanyDrawer: React.FC<CompanyDrawerProps> = ({ company, open, onClose }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [details, setDetails] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (company && open) {
      fetchCompanyDetails();
    }
  }, [company, open]);

  const fetchCompanyDetails = async () => {
    if (!company) return;
    
    try {
      setLoading(true);
      const data = await companyService.getDetails(company.companyId);
      console.log('Fetched company details:', data);
      setDetails(data);
    } catch (error) {
      console.error('Error fetching company details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!company) return null;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const tabs = [
    { label: 'Overview', icon: <BusinessIcon />, count: 0 },
    { label: 'Brand', icon: <BrandIcon />, count: details?.brand ? 1 : 0 },
    { label: 'Products', icon: <ProductIcon />, count: details?.products?.length || 0 },
    { label: 'UI Archetypes', icon: <UIIcon />, count: details?.uiArchetypes?.length || 0 },
    { label: 'Competitors', icon: <CompetitorIcon />, count: details?.competitors?.length || 0 },
    { label: 'Research', icon: <ResearchIcon />, count: details?.research?.length || 0 },
    { label: 'Users', icon: <UserIcon />, count: details?.users?.length || 0 },
  ];

  const renderBrandInfo = () => {
    if (!details?.brand) return <Typography sx={{ color: '#8b96a2' }}>No brand information available</Typography>;

    return (
      <Box sx={{ 
        p: 3, 
        borderRadius: 2,
        bgcolor: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)'
      }}>
        <Grid container spacing={3}>
          {Object.entries(details.brand).map(([key, value]) => (
            <Grid item xs={12} sm={6} key={key}>
              <Typography variant="subtitle2" sx={{ color: 'white', mb: 1, textTransform: 'capitalize' }}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Typography>
              <Typography sx={{ color: '#8b96a2' }}>{value as string}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const renderProducts = () => {
    if (!details?.products?.length) return <Typography sx={{ color: '#8b96a2' }}>No products available</Typography>;

    return (
      <Grid container spacing={3}>
        {details.products.map((product: any) => (
          <Grid item xs={12} sm={6} key={product.id}>
            <Box sx={{ 
              p: 3, 
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>{product.name}</Typography>
              <Typography variant="body2" sx={{ color: '#8b96a2', mb: 2 }}>{product.description}</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#8b96a2',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: 'rgba(255,255,255,0.05)',
                  }}
                >
                  {product.type}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#8b96a2',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: 'rgba(255,255,255,0.05)',
                  }}
                >
                  {product.status}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: '80%', md: 1000, lg: 1200 },
          bgcolor: '#070E1A',
          color: 'white',
          backgroundImage: 'linear-gradient(to bottom, rgba(124, 58, 237, 0.03), rgba(124, 58, 237, 0))',
        },
      }}
    >
      <Box sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
      }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '200px',
            background: 'linear-gradient(180deg, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0) 100%)',
            pointerEvents: 'none',
          }}
        />

        <Box sx={{ 
          position: 'relative', 
          p: 4, 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 3,
          background: 'linear-gradient(180deg, rgba(124, 58, 237, 0.08) 0%, rgba(124, 58, 237, 0.02) 100%)',
        }}>
          <Avatar
            src={company.logoUrl || ''}
            sx={{ 
              width: 80, 
              height: 80,
              bgcolor: 'primary.main',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
            }}
          >
            {company.name.charAt(0)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'white',
                mb: 1,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              {company.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: '#8b96a2',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: 'rgba(255,255,255,0.05)',
                }}
              >
                <BusinessIcon sx={{ fontSize: '1.2rem', color: 'primary.main' }} />
                {company.type}
              </Typography>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  color: '#8b96a2',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  bgcolor: 'rgba(255,255,255,0.05)',
                }}
              >
                <LocationIcon sx={{ fontSize: '1.2rem', color: 'primary.main' }} />
                {company.location || 'Location not specified'}
              </Typography>
              {company.size && (
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#8b96a2',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: 'rgba(255,255,255,0.05)',
                  }}
                >
                  <PeopleIcon sx={{ fontSize: '1.2rem', color: 'primary.main' }} />
                  {company.size} employees
                </Typography>
              )}
            </Box>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{ 
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.05)',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'rgba(255,255,255,0.1)',
            px: 2,
            bgcolor: 'rgba(124, 58, 237, 0.02)',
            '& .MuiTab-root': {
              color: '#8b96a2',
              minHeight: '56px',
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              transition: 'all 0.2s',
              '&:hover': {
                color: 'white',
                bgcolor: 'rgba(124, 58, 237, 0.08)',
              }
            },
            '& .Mui-selected': {
              color: 'primary.main',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
              height: '3px',
              borderRadius: '3px 3px 0 0',
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.label}
              icon={
                <Badge 
                  badgeContent={tab.count} 
                  color="primary"
                  sx={{
                    '& .MuiBadge-badge': {
                      bgcolor: 'rgba(124, 58, 237, 0.1)',
                      color: 'primary.main',
                    }
                  }}
                >
                  {tab.icon}
                </Badge>
              }
              label={tab.label}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
                alignItems: 'center',
                '& .MuiTab-iconWrapper': {
                  marginBottom: '0 !important',
                  marginRight: 1,
                }
              }}
            />
          ))}
        </Tabs>

        <Box 
          sx={{ 
            flexGrow: 1, 
            overflow: 'auto',
            background: 'linear-gradient(180deg, rgba(124, 58, 237, 0.02) 0%, rgba(124, 58, 237, 0) 100%)',
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress sx={{ color: 'primary.main' }} />
            </Box>
          ) : (
            <>
              <TabPanel value={tabValue} index={0}>
                {company.description && (
                  <Box sx={{ 
                    p: 3, 
                    mb: 4, 
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        color: 'white',
                        mb: 2
                      }}
                    >
                      <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} /> About
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: '#8b96a2',
                        fontSize: '1rem',
                        lineHeight: 1.7,
                        maxWidth: '800px'
                      }}
                    >
                      {company.description}
                    </Typography>
                  </Box>
                )}

                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      bgcolor: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      <Typography variant="h6" gutterBottom sx={{ color: 'white', mb: 2 }}>
                        Contact Information
                      </Typography>
                      <List>
                        {['Email', 'Phone', 'Website'].map((label) => {
                          const item = details.company && details.company[label.toLowerCase()];
                          return item ? (
                            <ListItem
                              key={label}
                              button={!!item.link}
                              onClick={() => item.link && window.open(item.link, '_blank')}
                              sx={{ px: 0 }}
                            >
                              <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                                {label === 'Email' && <EmailIcon />}
                                {label === 'Phone' && <PhoneIcon />}
                                {label === 'Website' && <WebsiteIcon />}
                              </ListItemIcon>
                              <ListItemText
                                primary={label}
                                secondary={item}
                                primaryTypographyProps={{ sx: { color: 'white' } }}
                                secondaryTypographyProps={{
                                  sx: { color: item.link ? 'primary.main' : '#8b96a2' },
                                }}
                              />
                            </ListItem>
                          ) : null;
                        })}
                      </List>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      bgcolor: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      <Typography variant="h6" gutterBottom sx={{ color: 'white', mb: 2 }}>
                        Social Profiles
                      </Typography>
                      <List>
                        {['LinkedIn', 'Twitter', 'GitHub'].map((label) => {
                          const item = details.company && details.company[`${label.toLowerCase()}Url`];
                          return item ? (
                            <ListItem
                              key={label}
                              button={!!item}
                              onClick={() => item && window.open(item, '_blank')}
                              sx={{ px: 0 }}
                            >
                              <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                                {label === 'LinkedIn' && <LinkedInIcon />}
                                {label === 'Twitter' && <TwitterIcon />}
                                {label === 'GitHub' && <GitHubIcon />}
                              </ListItemIcon>
                              <ListItemText
                                primary={label}
                                secondary={item}
                                primaryTypographyProps={{ sx: { color: 'white' } }}
                                secondaryTypographyProps={{
                                  sx: { color: item ? 'primary.main' : '#8b96a2' },
                                }}
                              />
                            </ListItem>
                          ) : null;
                        })}
                      </List>
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                {renderBrandInfo()}
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <ProductsTab products={details.products || []} />
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                <UIArchetypesTab uiArchetypes={details.uiArchetypes || []} />
              </TabPanel>

              <TabPanel value={tabValue} index={4}>
                <CompetitorsTab competitors={details.competitors || []} />
              </TabPanel>

              <TabPanel value={tabValue} index={5}>
                <ResearchTab research={details.research || []} />
              </TabPanel>

              <TabPanel value={tabValue} index={6}>
                <UsersTab users={details.users || []} />
              </TabPanel>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default CompanyDrawer; 