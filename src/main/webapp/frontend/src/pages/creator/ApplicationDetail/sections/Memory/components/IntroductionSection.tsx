import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';
import AccordionSection from './AccordionSection';
import EditableContent from './EditableContent';
import { MemoryDocument, Comment } from '../types';

interface IntroductionSectionProps {
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

const IntroductionSection: React.FC<IntroductionSectionProps> = ({
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
  const sectionComments = comments.filter(c => c.section === 'introduction');

  return (
    <AccordionSection
      title="Introduction & Summary"
      icon={<StarIcon />}
      expanded={expandedSection === 'introduction'}
      onChange={onAccordionChange('introduction')}
    >
      <Box>
        <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1 }}>
          Product Name
        </Typography>
        <EditableContent
          content={memory.introduction.productName}
          elementId="intro-product-name"
          section="introduction"
          field="productName"
          comments={sectionComments.filter(c => c.elementId === 'intro-product-name')}
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
        <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1 }}>
          One-Line Summary
        </Typography>
        <EditableContent
          content={memory.introduction.summary}
          elementId="intro-summary"
          section="introduction"
          field="summary"
          comments={sectionComments.filter(c => c.elementId === 'intro-summary')}
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
        <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1 }}>
          Core Problem Statement
        </Typography>
        <EditableContent
          content={memory.introduction.problemStatement}
          elementId="intro-problem"
          section="introduction"
          field="problemStatement"
          comments={sectionComments.filter(c => c.elementId === 'intro-problem')}
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
        <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1 }}>
          Intended Outcome
        </Typography>
        <EditableContent
          content={memory.introduction.intendedOutcome}
          elementId="intro-outcome"
          section="introduction"
          field="intendedOutcome"
          comments={sectionComments.filter(c => c.elementId === 'intro-outcome')}
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

export default IntroductionSection;
