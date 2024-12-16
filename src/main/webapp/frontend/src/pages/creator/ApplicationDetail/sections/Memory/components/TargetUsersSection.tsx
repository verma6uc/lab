import React from 'react';
import {
  Box,
  Typography,
  Chip,
} from '@mui/material';
import { Group as GroupIcon } from '@mui/icons-material';
import AccordionSection from './AccordionSection';
import EditableContent from './EditableContent';
import { MemoryDocument, Comment } from '../types';

interface TargetUsersSectionProps {
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

const TargetUsersSection: React.FC<TargetUsersSectionProps> = ({
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
  const sectionComments = comments.filter(c => c.section === 'targetUsers');

  return (
    <AccordionSection
      title="Target Users & Personas"
      icon={<GroupIcon />}
      expanded={expandedSection === 'targetUsers'}
      onChange={onAccordionChange('targetUsers')}
    >
      {/* Personas */}
      {memory.targetUsers?.personas?.map((persona, index) => (
        <Box key={index}>
          <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1 }}>
            {persona.name}
          </Typography>
          <EditableContent
            content={persona.description}
            elementId={`persona-${index}`}
            section="targetUsers"
            field={`personas[${index}].description`}
            comments={sectionComments.filter(c => c.elementId === `persona-${index}`)}
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

      {/* Pain Points */}
      <Box>
        <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1 }}>
          Pain Points
        </Typography>
        {memory.targetUsers?.painPoints?.map((point, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <EditableContent
              content={point}
              elementId={`pain-point-${index}`}
              section="targetUsers"
              field={`painPoints[${index}]`}
              comments={sectionComments.filter(c => c.elementId === `pain-point-${index}`)}
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

      {/* Contexts */}
      <Box>
        <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1 }}>
          Context & Scenarios
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {memory.targetUsers?.contexts?.map((context, index) => (
            <Chip
              key={index}
              label={context}
              sx={{
                color: 'common.white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.15)' },
              }}
            />
          ))}
        </Box>
        <EditableContent
          content=""
          elementId="contexts"
          section="targetUsers"
          field="contexts"
          comments={sectionComments.filter(c => c.elementId === 'contexts')}
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
    </AccordionSection>
  );
};

export default TargetUsersSection;
