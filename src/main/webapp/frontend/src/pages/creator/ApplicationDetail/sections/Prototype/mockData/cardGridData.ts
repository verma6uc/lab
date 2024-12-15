import { PrototypeSection } from '../types';

export const cardGridData: PrototypeSection = {
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
}; 