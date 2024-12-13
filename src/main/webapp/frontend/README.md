# Creator Labs Frontend

The frontend application for Creator Labs, built with React, TypeScript, and Material-UI.

## Features

### 1. Public Pages

#### Home Page
- Hero section with value propositions
- Feature highlights
- Interactive cards
- Call-to-action sections

#### Solutions Page
- Industry-specific case studies
- Interactive solution cards
- Detailed case study modals
- Agent contribution stories

#### Agents Page
- AI agent profiles
- Interactive cards with animations
- Skill and capability displays
- Agent collaboration visualization

#### Personas Page
- User persona profiles
- Expandable detail cards
- Success stories and testimonials
- Role-specific benefits

#### Journey Page
- 8-stage development journey
- Interactive timeline
- Floating navigation
- Stage-specific details

#### Features Page
- Feature categories
- Interactive feature cards
- Benefit breakdowns
- Visual feature showcase

### 2. Shared Components

#### Navigation
- `Navbar.tsx`: Responsive navigation bar
- Dynamic menu items
- Smooth transitions
- Mobile-friendly design

#### Layout
- `PublicLayout.tsx`: Layout for public pages
- `MainLayout.tsx`: Layout for authenticated pages
- Consistent padding and spacing
- Proper content organization

#### Visual Elements
- `ParticleBackground.tsx`: Neural network animation
- `AgentIcons.tsx`: Custom SVG icons
- `StyledComponents.tsx`: Reusable styled elements
- Gradient text and buttons

## Technology Stack

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **Material-UI (MUI)**: UI component library
- **Framer Motion**: Animation library
- **React Router**: Navigation and routing
- **CSS-in-JS**: Styled components and MUI styling system

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── PublicLayout.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── Navbar/
│   │   │   └── Navbar.tsx
│   │   └── shared/
│   │       ├── AgentIcons.tsx
│   │       ├── ParticleBackground.tsx
│   │       └── StyledComponents.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Solutions.tsx
│   │   ├── Agents.tsx
│   │   ├── Personas.tsx
│   │   ├── Journey.tsx
│   │   └── Features.tsx
│   ├── theme/
│   │   └── AppTheme.tsx
│   └── routes/
│       └── index.tsx
├── public/
└── package.json
```

## Style Guide

### Component Structure
```typescript
// ComponentName.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

interface ComponentProps {
  // Props interface
}

const ComponentName: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  return (
    <Box className="content-card">
      {/* Component content */}
    </Box>
  );
};

export default ComponentName;
```

### Styling Classes
- `.page-header`: Page header styling
- `.content-card`: Card container styling
- `.text-primary`: Primary text color
- `.text-secondary`: Secondary text color
- `.text-accent`: Accent text color
- `.highlight-chip`: Highlighted chip styling
- `.section-title`: Section title styling

## Development

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

### Environment Variables
Create a `.env` file:
```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_ENV=development
```

## Best Practices

### 1. Component Development
- Use TypeScript interfaces for props
- Implement proper error boundaries
- Use React.memo for performance optimization
- Follow component composition patterns

### 2. Styling
- Use MUI theme system
- Maintain consistent spacing
- Follow responsive design principles
- Use shared color palette

### 3. State Management
- Use React hooks effectively
- Implement proper data fetching
- Handle loading and error states
- Maintain clean component state

### 4. Performance
- Lazy load components when possible
- Optimize images and assets
- Minimize bundle size
- Use proper caching strategies

## Testing

### Unit Tests
```bash
# Run unit tests
npm test

# Run tests with coverage
npm test -- --coverage
```

### E2E Tests
```bash
# Run end-to-end tests
npm run test:e2e
```

## Building and Deployment

### Production Build
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Deployment Checklist
- Update environment variables
- Run all tests
- Build production bundle
- Check bundle size
- Verify assets loading
- Test in multiple browsers

## Contributing

1. Follow the style guide
2. Write meaningful commit messages
3. Add proper documentation
4. Include tests when applicable
5. Create detailed pull requests

## Troubleshooting

Common issues and solutions:

1. **Build Errors**
   - Clear npm cache
   - Delete node_modules and reinstall
   - Check TypeScript errors

2. **Runtime Errors**
   - Check console logs
   - Verify environment variables
   - Check network requests

3. **Style Issues**
   - Verify theme configuration
   - Check responsive breakpoints
   - Validate CSS specificity

## Support

For support:
- Create an issue in the repository
- Contact the development team
- Check documentation
