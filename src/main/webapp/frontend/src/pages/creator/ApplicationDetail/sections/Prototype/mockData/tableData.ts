import { PrototypeSection } from '../types';

export const tableData: PrototypeSection = {
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
}; 