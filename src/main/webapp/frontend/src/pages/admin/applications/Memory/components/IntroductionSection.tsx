import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import {
  Info as IntroIcon,
} from '@mui/icons-material';
import AccordionSection from './AccordionSection';
import EditableContent from './EditableContent';
import { Introduction, Comment } from '../types';

interface IntroductionSectionProps {
  introduction: Introduction;
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

const IntroductionSection: React.FC<IntroductionSectionProps> = ({
  introduction,
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
  const sectionComments = comments.filter(c => c.section === 'introduction');

  return (
    <AccordionSection
      title="Introduction & Summary"
      icon={<IntroIcon />}
      expanded={expandedSection === 'introduction'}
      onChange={onAccordionChange('introduction')}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.5)', mb: 1 }}>
            Product Name
          </Typography>
          <EditableContent
            content={introduction.productName}
            elementId="introduction-product-name"
            section="introduction"
            field="productName"
            comments={sectionComments.filter(c => c.elementId === 'introduction-product-name')}
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

        <Box>
          <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.5)', mb: 1 }}>
            One-Line Summary
          </Typography>
          <EditableContent
            content={introduction.summary}
            elementId="introduction-summary"
            section="introduction"
            field="summary"
            comments={sectionComments.filter(c => c.elementId === 'introduction-summary')}
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

        <Box>
          <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.5)', mb: 1 }}>
            Core Problem Statement
          </Typography>
          <EditableContent
            content={introduction.problemStatement}
            elementId="introduction-problem"
            section="introduction"
            field="problemStatement"
            comments={sectionComments.filter(c => c.elementId === 'introduction-problem')}
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

        <Box>
          <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.5)', mb: 1 }}>
            Intended Outcome
          </Typography>
          <EditableContent
            content={introduction.intendedOutcome}
            elementId="introduction-outcome"
            section="introduction"
            field="intendedOutcome"
            comments={sectionComments.filter(c => c.elementId === 'introduction-outcome')}
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
      </Box>
    </AccordionSection>
  );
};

export default IntroductionSection;
