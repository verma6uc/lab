import { PrototypeSection } from '../types';

export const kanbanData: PrototypeSection = {
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
}; 