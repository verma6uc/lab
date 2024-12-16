export interface Entity {
  name: string;
  description: string;
  role: 'primary' | 'secondary';
  responsibilities: string[];
}

export interface MetricImpact {
  metric: string;
  description: string;
  calculation: string;
  affectedMetrics: {
    name: string;
    impact: string;
  }[];
}

export interface Process {
  name: string;
  description: string;
  detailedFlow: string; // 100+ word description
  steps: string[];
  entities: string[];
  metrics: MetricImpact[];
}

export interface Feature {
  name: string;
  description: string;
  entities: Entity[];
  processes: Process[];
}

export interface FeatureCategory {
  category: string;
  overview: string;
  features: Feature[];
}

export interface CoreFeatureCategories {
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
            role: 'primary',
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
            role: 'primary',
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
            detailedFlow: `The transaction recording process begins when a sales representative initiates a new sale in the system. This critical workflow encompasses multiple stages of data validation and enrichment to ensure accurate revenue tracking and commission calculations. Initially, the sales rep enters basic transaction details including the product, quantity, and pricing information. The system then validates this input against current product configurations and pricing rules, applying any relevant discounts or promotions automatically. Following this, customer information is either selected from existing records or created for new customers, establishing the crucial link between the sale and the customer's history. The process then moves to financial validation, where payment terms are confirmed and credit checks are performed if necessary. Once validated, the system triggers a series of calculations including commission computations, revenue recognition schedules, and updates to sales targets. The process concludes with the generation of all necessary documentation and the updating of various dashboards and reports. Throughout this flow, multiple validation checkpoints ensure data accuracy and compliance with business rules, while automated notifications keep relevant stakeholders informed of the transaction's progress.`,
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
            role: 'secondary',
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
            detailedFlow: `The pattern analysis process is a sophisticated data analysis workflow that begins with the aggregation of historical customer transaction data across multiple dimensions. This comprehensive process examines purchase frequencies, product combinations, seasonal variations, and price sensitivity patterns. The analysis starts by collecting transaction data from the past 12 months, segmenting it by customer categories, product lines, and temporal factors. Advanced statistical methods are applied to identify significant patterns, such as seasonal buying trends, product affinity relationships, and price elasticity indicators. The system then correlates these patterns with external factors such as marketing campaigns, economic indicators, and competitor activities to provide context-rich insights. Machine learning algorithms process this data to generate predictive models for future purchasing behavior, helping to optimize inventory management and marketing strategies. The process also includes anomaly detection to identify unusual patterns that might indicate changing market conditions or emerging opportunities. Results are continuously validated against new transaction data, with the models being refined based on prediction accuracy. This iterative approach ensures that the pattern analysis remains current and actionable, providing valuable insights for sales strategy and inventory management.`,
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
};

export interface Comment {
  id: number;
  content: string;
  author: {
    id: number;
    name: string;
    avatarUrl?: string;
  };
  section: string;
  elementId: string;
  createdAt: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'archived';
  replies?: Comment[];
}

export interface MemoryDocument {
  coreFeatures: CoreFeatureCategories;
  createdAt: string;
  updatedAt: string;
  author: string;
  status: 'draft' | 'in_review' | 'approved';
  version: string;
  comments: Comment[];
}

export interface MemorySection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  order: number;
}

export const MEMORY_SECTIONS = {
  coreFeatures: {
    id: 'coreFeatures',
    title: 'Core Features & Capabilities',
    description: 'Detailed product functionalities and implementation details',
    order: 1,
  },
} as const;

export const CORE_FEATURE_CATEGORY_ORDER = [
  'dataManagement',
  'analytics',
] as const;

export type CoreFeatureCategoryId = typeof CORE_FEATURE_CATEGORY_ORDER[number];
