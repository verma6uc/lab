import { PrototypeSection } from '../types';

export const metricsData: PrototypeSection = {
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
}; 