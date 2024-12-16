import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import {
  Settings as FeaturesIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import AccordionSection from './AccordionSection';
import EditableContent from './EditableContent';
import { MemoryDocument, Comment } from '../types';

interface CoreFeaturesSectionProps {
  memory: MemoryDocument;
  expandedSection: string;
  comments: Comment[];
  expandedComments: string[];
  activeCommentElement: string | null;
  loadingComments: string[];
  editingField: string | null;
  editValue: string;
  isLoading: boolean;
  newComment: string;
  onAccordionChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onStartEdit: (field: string, value: string) => void;
  onSaveEdit: (section: string, field: string) => void;
  onCancelEdit: () => void;
  onEditValueChange: (value: string) => void;
  onToggleComments: (elementId: string) => void;
  onOpenCommentsModal: (comments: Comment[]) => void;
  onSetActiveCommentElement: (elementId: string | null) => void;
  onCommentChange: (value: string) => void;
  onCommentSubmit: (elementId: string, section: string) => void;
}

const CoreFeaturesSection: React.FC<CoreFeaturesSectionProps> = ({
  memory,
  expandedSection,
  comments,
  expandedComments,
  activeCommentElement,
  loadingComments,
  editingField,
  editValue,
  isLoading,
  newComment,
  onAccordionChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditValueChange,
  onToggleComments,
  onOpenCommentsModal,
  onSetActiveCommentElement,
  onCommentChange,
  onCommentSubmit,
}) => {
  const sectionComments = comments.filter(c => c.section === 'coreFeatures');

  return (
    <AccordionSection
      title="Core Features & Capabilities"
      icon={<FeaturesIcon />}
      expanded={expandedSection === 'coreFeatures'}
      onChange={onAccordionChange('coreFeatures')}
    >
      {memory.coreFeatures?.map((category, categoryIndex) => (
        <Box key={categoryIndex}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <CategoryIcon sx={{ color: 'primary.main' }} />
            <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
              {category.category}
            </Typography>
          </Box>
          {category.features?.map((feature, featureIndex) => (
            <Box key={featureIndex} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 0.5 }}>
                {feature.name}
              </Typography>
              <EditableContent
                content={feature.description}
                elementId={`feature-${categoryIndex}-${featureIndex}`}
                section="coreFeatures"
                field={`features[${categoryIndex}].description`}
                comments={sectionComments.filter(c => c.elementId === `feature-${categoryIndex}-${featureIndex}`)}
                expandedComments={expandedComments}
                activeCommentElement={activeCommentElement}
                loadingComments={loadingComments}
                editingField={editingField}
                editValue={editValue}
                isLoading={isLoading}
                newComment={newComment}
                onStartEdit={onStartEdit}
                onSaveEdit={onSaveEdit}
                onCancelEdit={onCancelEdit}
                onEditValueChange={onEditValueChange}
                onToggleComments={onToggleComments}
                onOpenCommentsModal={onOpenCommentsModal}
                onSetActiveCommentElement={onSetActiveCommentElement}
                onCommentChange={onCommentChange}
                onCommentSubmit={onCommentSubmit}
              />
            </Box>
          ))}
        </Box>
      ))}
    </AccordionSection>
  );
};

export default CoreFeaturesSection;
