import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import PageContainer from '../../components/shared/PageContainer';
import ApplicationEditModal from '../../components/admin/companies/details/ApplicationEditModal';
import PDLCStage from '../../components/admin/companies/details/PDLCStage';
import ParticleBackground from '../../components/ParticleBackground';
import { STAGES } from '../../components/admin/companies/details/stages';
import { MemoryDocument } from './applications/Memory/types';

const ApplicationDetails: React.FC = () => {
  const { companyId, applicationId } = useParams<{ companyId: string; applicationId: string }>();
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [currentStage, setCurrentStage] = useState<keyof typeof STAGES>('memory');

  // TODO: Replace with actual data fetching
  const application = {
    id: 1,
    name: 'Sales Dashboard',
    description: 'Real-time sales analytics and reporting dashboard that provides comprehensive insights into sales performance, customer behavior, and team metrics.',
    missionStatement: 'Empowering sales teams with real-time insights and analytics to drive better decisions and improve performance.',
    company: {
      id: 1,
      name: 'Acme Corporation',
    },
    memory: {
      coreFeatures: {
        dataManagement: {
          category: 'Data Management',
          overview: 'Core data entities and their relationships that power the sales dashboard',
          features: [
            {
              name: 'Sales Transaction Management',
              description: 'Central system for recording and managing sales transactions',
              entities: [
                {
                  name: 'Sales Transaction',
                  description: 'Record of a sale including amount, product, date, and associated entities',
                  role: 'primary' as const,
                  responsibilities: [
                    'Store transaction details',
                    'Link sales rep to sale',
                    'Track product information',
                    'Associate customer data'
                  ]
                },
                {
                  name: 'Product',
                  description: 'Items or services being sold',
                  role: 'primary' as const,
                  responsibilities: [
                    'Define product details',
                    'Track inventory',
                    'Associate with transactions'
                  ]
                }
              ],
              processes: [
                {
                  name: 'Transaction Recording',
                  description: 'Process of capturing and validating sales data',
                  detailedFlow: 'The transaction recording process begins when a sales representative initiates a new sale in the system. This critical workflow encompasses multiple stages of data validation and enrichment to ensure accurate revenue tracking and commission calculations. Initially, the sales rep enters basic transaction details including the product, quantity, and pricing information. The system then validates this input against current product configurations and pricing rules, applying any relevant discounts or promotions automatically. Following this, customer information is either selected from existing records or created for new customers, establishing the crucial link between the sale and the customer\'s history. The process then moves to financial validation, where payment terms are confirmed and credit checks are performed if necessary. Once validated, the system triggers a series of calculations including commission computations, revenue recognition schedules, and updates to sales targets. The process concludes with the generation of all necessary documentation and the updating of various dashboards and reports. Throughout this flow, multiple validation checkpoints ensure data accuracy and compliance with business rules, while automated notifications keep relevant stakeholders informed of the transaction\'s progress.',
                  steps: [
                    'Enter transaction details',
                    'Validate data completeness',
                    'Update related records',
                    'Generate notifications'
                  ],
                  entities: ['Sales Transaction', 'Product'],
                  metrics: [
                    {
                      metric: 'Revenue Recognition',
                      description: 'Calculation of recognized revenue from the transaction',
                      calculation: 'Transaction Amount * Recognition Percentage based on delivery status',
                      affectedMetrics: [
                        {
                          name: 'Monthly Revenue',
                          impact: 'Direct addition to monthly recognized revenue'
                        },
                        {
                          name: 'Sales Rep Performance',
                          impact: 'Contributes to sales rep\'s monthly quota achievement'
                        }
                      ]
                    },
                    {
                      metric: 'Commission Calculation',
                      description: 'Determination of sales rep commission',
                      calculation: 'Transaction Amount * Commission Rate based on product type and sales rep level',
                      affectedMetrics: [
                        {
                          name: 'Sales Cost',
                          impact: 'Increases total sales cost for the period'
                        },
                        {
                          name: 'Rep Earnings',
                          impact: 'Adds to sales rep\'s total compensation'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        analytics: {
          category: 'Analytics & Reporting',
          overview: 'Comprehensive analytics and reporting capabilities',
          features: [
            {
              name: 'Customer Analytics',
              description: 'Analysis of customer behavior and trends',
              entities: [
                {
                  name: 'Customer',
                  description: 'Buyer profile and history',
                  role: 'secondary' as const,
                  responsibilities: [
                    'Store customer information',
                    'Track purchase history',
                    'Maintain preferences'
                  ]
                }
              ],
              processes: [
                {
                  name: 'Pattern Analysis',
                  description: 'Analysis of customer buying patterns',
                  detailedFlow: 'The pattern analysis process is a sophisticated data analysis workflow that begins with the aggregation of historical customer transaction data across multiple dimensions. This comprehensive process examines purchase frequencies, product combinations, seasonal variations, and price sensitivity patterns. The analysis starts by collecting transaction data from the past 12 months, segmenting it by customer categories, product lines, and temporal factors. Advanced statistical methods are applied to identify significant patterns, such as seasonal buying trends, product affinity relationships, and price elasticity indicators. The system then correlates these patterns with external factors such as marketing campaigns, economic indicators, and competitor activities to provide context-rich insights. Machine learning algorithms process this data to generate predictive models for future purchasing behavior, helping to optimize inventory management and marketing strategies. The process also includes anomaly detection to identify unusual patterns that might indicate changing market conditions or emerging opportunities. Results are continuously validated against new transaction data, with the models being refined based on prediction accuracy. This iterative approach ensures that the pattern analysis remains current and actionable, providing valuable insights for sales strategy and inventory management.',
                  steps: [
                    'Collect historical data',
                    'Identify patterns',
                    'Generate insights',
                    'Present recommendations'
                  ],
                  entities: ['Customer', 'Sales Transaction'],
                  metrics: [
                    {
                      metric: 'Customer Lifetime Value',
                      description: 'Projected total value of customer relationship',
                      calculation: 'Sum of historical purchases + Predicted future purchases based on buying patterns',
                      affectedMetrics: [
                        {
                          name: 'Customer Segmentation',
                          impact: 'Determines customer tier and service level'
                        },
                        {
                          name: 'Marketing Budget Allocation',
                          impact: 'Influences per-customer marketing spend'
                        }
                      ]
                    },
                    {
                      metric: 'Purchase Frequency',
                      description: 'Analysis of time between purchases',
                      calculation: 'Average days between customer transactions over last 12 months',
                      affectedMetrics: [
                        {
                          name: 'Inventory Planning',
                          impact: 'Affects stock level recommendations'
                        },
                        {
                          name: 'Churn Risk',
                          impact: 'Contributes to customer churn probability calculation'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: 'System',
      status: 'draft',
      version: '1.0.0',
      comments: [],
    } as MemoryDocument,
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleSave = (id: number, data: { name: string; description: string }) => {
    // TODO: Implement save logic
    console.log('Save application:', id, data);
  };

  const handleBack = () => {
    navigate(`/admin/companies/${companyId}`);
  };

  const handleStageSelect = (stage: keyof typeof STAGES) => {
    setCurrentStage(stage);
  };

  const handleSaveMemory = async (section: string, field: string, value: string) => {
    // TODO: Implement memory save logic
    console.log('Save memory:', section, field, value);
  };

  const handleAddComment = async (elementId: string, section: string, content: string) => {
    // TODO: Implement comment add logic
    console.log('Add comment:', elementId, section, content);
  };

  return (
    <PageContainer>
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}>
          <ParticleBackground />
        </Box>

        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '1400px', mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
          {/* Header */}
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <IconButton onClick={handleBack} sx={{ color: 'white' }}>
                <ArrowBackIcon />
              </IconButton>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 600 }}>
                  {application.name}
                </Typography>
                <Link 
                  to={`/admin/companies/${companyId}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    startIcon={<BusinessIcon />}
                    sx={{ 
                      mt: 1,
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': { 
                        color: '#00A3FF',
                      },
                    }}
                  >
                    {application.company.name}
                  </Button>
                </Link>
              </Box>
              <Tooltip title="Edit Application">
                <IconButton 
                  onClick={handleEdit}
                  sx={{ 
                    color: '#00A3FF',
                    '&:hover': {
                      bgcolor: 'rgba(0, 163, 255, 0.1)',
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.25rem',
                fontWeight: 500,
                fontStyle: 'italic',
                lineHeight: 1.6,
                maxWidth: '800px',
                mb: 6,
              }}
            >
              {application.missionStatement}
            </Typography>

            {/* PDLC Stage */}
            <PDLCStage
              currentStage={currentStage}
              onStageSelect={handleStageSelect}
              memory={application.memory}
              onSave={handleSaveMemory}
              onAddComment={handleAddComment}
            />
          </Box>

          <ApplicationEditModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            application={application}
            onSave={handleSave}
          />
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ApplicationDetails;
