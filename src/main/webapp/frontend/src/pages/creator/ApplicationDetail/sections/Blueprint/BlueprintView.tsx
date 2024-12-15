import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { Architecture as BlueprintIcon } from '@mui/icons-material';
import BlueprintSidebar from './components/BlueprintSidebar';
import DomainModelView from './components/DomainModelView';
import PageFlowView from './components/PageFlowView';
import DataModelView from './components/DataModelView';
import CommentsPanel from './components/CommentsPanel';
import EntityDetailsPanel from './components/EntityDetailsPanel';
import { mockEntities, mockPages, mockComments, mockRelationships } from './mockData.tsx';
import { Entity, SelectedElement } from './types';

const BlueprintView: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [selectedEntity, setSelectedEntity] = React.useState<Entity | null>(null);
  const [selectedElement, setSelectedElement] = React.useState<SelectedElement | null>(null);
  const [showComments, setShowComments] = React.useState(false);
  const [showEntityDetails, setShowEntityDetails] = React.useState(false);
  const [comments, setComments] = React.useState(mockComments);

  const handleAddComment = (content: string) => {
    if (!selectedElement) return;
    const comment = {
      id: comments.length + 1,
      author: "Current User",
      content,
      timestamp: new Date().toISOString(),
      elementId: selectedElement.id,
      elementType: selectedElement.type
    };
    setComments([...comments, comment]);
  };

  const handleSelectElement = (element: SelectedElement) => {
    setSelectedElement(element);
    setShowComments(true);
  };

  const handleShowEntityDetails = (entity: Entity) => {
    setSelectedEntity(entity);
    setShowEntityDetails(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <DomainModelView
            entities={mockEntities}
            relationships={mockRelationships}
            onSelectElement={handleSelectElement}
            onShowEntityDetails={handleShowEntityDetails}
          />
        );
      case 1:
        return (
          <PageFlowView
            pages={mockPages}
            onSelectElement={handleSelectElement}
            onShowPageDetails={() => {}}
          />
        );
      case 2:
        return (
          <DataModelView
            entities={mockEntities}
            relationships={mockRelationships}
            onSelectElement={handleSelectElement}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Card
        sx={{
          background: 'transparent',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'none',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <BlueprintIcon sx={{ color: '#00A3FF', fontSize: 32 }} />
            <Box>
              <Typography variant="h5" sx={{ color: 'common.white', mb: 0.5 }}>
                Blueprint Definition
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Define your application's structure and behavior
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 3, minHeight: 700 }}>
            <BlueprintSidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <Box sx={{ flex: 1 }}>
              {renderContent()}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <CommentsPanel
        open={showComments}
        onClose={() => setShowComments(false)}
        selectedElement={selectedElement}
        comments={comments}
        onAddComment={handleAddComment}
      />

      <EntityDetailsPanel
        open={showEntityDetails}
        onClose={() => setShowEntityDetails(false)}
        selectedEntity={selectedEntity}
        entities={mockEntities}
      />
    </Box>
  );
};

export default BlueprintView; 