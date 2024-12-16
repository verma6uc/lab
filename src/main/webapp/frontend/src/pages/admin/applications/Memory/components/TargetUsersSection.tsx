import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Stack,
} from '@mui/material';
import {
  Group as UsersIcon,
  Person as PersonaIcon,
  ErrorOutline as PainPointIcon,
  Layers as ContextIcon,
} from '@mui/icons-material';
import AccordionSection from './AccordionSection';
import EditableContent from './EditableContent';
import { TargetUsers, Comment } from '../types';

interface TargetUsersSectionProps {
  targetUsers: TargetUsers;
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
  targetUsers,
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
      icon={<UsersIcon />}
      expanded={expandedSection === 'targetUsers'}
      onChange={onAccordionChange('targetUsers')}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {/* Personas */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <PersonaIcon sx={{ color: 'primary.main' }} />
            <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
              Primary Personas
            </Typography>
          </Box>
          {targetUsers.personas.map((persona, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 1 }}>
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
        </Box>

        {/* Pain Points */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <PainPointIcon sx={{ color: 'primary.main' }} />
            <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
              User Pain Points
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: 1 }}>
            {targetUsers.painPoints.map((point, index) => (
              <EditableContent
                key={index}
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
                renderContent={(content) => (
                  <Chip
                    label={content}
                    sx={{
                      bgcolor: 'rgba(244, 67, 54, 0.1)',
                      color: '#f44336',
                      border: '1px solid rgba(244, 67, 54, 0.2)',
                      '&:hover': {
                        bgcolor: 'rgba(244, 67, 54, 0.2)',
                      },
                    }}
                  />
                )}
              />
            ))}
          </Stack>
        </Box>

        {/* Contexts */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <ContextIcon sx={{ color: 'primary.main' }} />
            <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
              Context & Scenarios
            </Typography>
          </Box>
          {targetUsers.contexts.map((context, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <EditableContent
                content={context}
                elementId={`context-${index}`}
                section="targetUsers"
                field={`contexts[${index}]`}
                comments={sectionComments.filter(c => c.elementId === `context-${index}`)}
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
      </Box>
    </AccordionSection>
  );
};

export default TargetUsersSection;
