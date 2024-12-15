import { PrototypeSection } from './types.ts';

export const mockSections: PrototypeSection[] = [
  {
    id: 'data-table-section',
    title: 'User Management',
    sections: [
      {
        id: 'users-table',
        title: 'Users Table',
        type: 'data-table',
        validations: {
          dataModel: true,
          businessLogic: true
        },
        config: {
          columns: [
            { id: 'name', label: 'Name', type: 'text', sortable: true, filterable: true },
            { id: 'email', label: 'Email', type: 'text', sortable: true, filterable: true },
            { id: 'role', label: 'Role', type: 'text', sortable: true, filterable: true },
            { id: 'status', label: 'Status', type: 'status', sortable: true, filterable: true },
            { id: 'lastLogin', label: 'Last Login', type: 'date', sortable: true },
          ],
          items: [
            { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-12-01' },
            { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', lastLogin: '2023-11-28' },
            { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'Editor', status: 'Active', lastLogin: '2023-12-02' },
          ]
        }
      }
    ]
  },
  {
    id: 'metrics-section',
    title: 'Dashboard Overview',
    sections: [
      {
        id: 'key-metrics',
        title: 'Key Metrics',
        type: 'metrics',
        validations: {
          dataModel: true,
          businessLogic: true
        },
        config: {
          metrics: [
            {
              id: 'total-users',
              label: 'Total Users',
              value: 1234,
              trend: { value: 12, direction: 'up' },
              icon: '/icons/users.png'
            },
            {
              id: 'active-sessions',
              label: 'Active Sessions',
              value: 456,
              trend: { value: 5, direction: 'down' },
              icon: '/icons/sessions.png'
            },
            {
              id: 'conversion-rate',
              label: 'Conversion Rate',
              value: '24%',
              trend: { value: 8, direction: 'up' },
              icon: '/icons/conversion.png'
            },
            {
              id: 'revenue',
              label: 'Revenue',
              value: 45600,
              trend: { value: 15, direction: 'up' },
              icon: '/icons/revenue.png'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'card-grid-section',
    title: 'Products Catalog',
    sections: [
      {
        id: 'products-grid',
        title: 'Products',
        type: 'card-grid',
        validations: {
          dataModel: false,
          businessLogic: true
        },
        config: {
          items: [
            {
              id: '1',
              title: 'Premium Plan',
              description: 'Enterprise-grade features for large teams',
              imageUrl: '/images/premium.jpg',
              tags: ['Enterprise', 'Premium', 'Support'],
              status: 'active'
            },
            {
              id: '2',
              title: 'Standard Plan',
              description: 'Perfect for growing businesses',
              imageUrl: '/images/standard.jpg',
              tags: ['Business', 'Growth'],
              status: 'active'
            },
            {
              id: '3',
              title: 'Basic Plan',
              description: 'Get started with essential features',
              imageUrl: '/images/basic.jpg',
              tags: ['Starter', 'Essential'],
              status: 'pending'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'kanban-section',
    title: 'Project Management',
    sections: [
      {
        id: 'tasks-kanban',
        title: 'Tasks Board',
        type: 'kanban',
        validations: {
          dataModel: true,
          businessLogic: false
        },
        config: {
          kanban: [
            {
              id: 'todo',
              title: 'To Do',
              items: [
                {
                  id: 'task-1',
                  title: 'Design System',
                  description: 'Create a unified design system',
                  priority: 'high'
                },
                {
                  id: 'task-2',
                  title: 'User Testing',
                  description: 'Conduct user testing sessions',
                  priority: 'medium'
                }
              ]
            },
            {
              id: 'in-progress',
              title: 'In Progress',
              items: [
                {
                  id: 'task-3',
                  title: 'API Integration',
                  description: 'Integrate with payment gateway',
                  priority: 'high'
                }
              ]
            },
            {
              id: 'done',
              title: 'Done',
              items: [
                {
                  id: 'task-4',
                  title: 'Documentation',
                  description: 'Update API documentation',
                  priority: 'low'
                }
              ]
            }
          ]
        }
      }
    ]
  }
];

export const getValidationResponse = (sectionId: string, feedback: string) => {
  const section = mockSections.flatMap(s => s.sections).find(s => s.id === sectionId);
  
  if (!section) {
    return {
      isValid: false,
      message: 'Section not found',
      validationCode: 'DATA_MODEL' as const
    };
  }

  if (section.validations?.dataModel === false) {
    return {
      isValid: false,
      message: 'This change cannot be implemented due to current data model limitations',
      validationCode: 'DATA_MODEL' as const
    };
  }

  if (section.validations?.businessLogic === false) {
    return {
      isValid: false,
      message: 'This change violates existing business logic rules',
      validationCode: 'BUSINESS_LOGIC' as const
    };
  }

  return {
    isValid: true,
    message: 'Feedback accepted and will be implemented',
    validationCode: 'SUCCESS' as const
  };
}; 