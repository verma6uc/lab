import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { Memory as MemoryIcon } from '@mui/icons-material';
import IntroductionSection from './components/IntroductionSection';
import TargetUsersSection from './components/TargetUsersSection';
import CoreFeaturesSection from './components/CoreFeaturesSection';
import CommentsModal from './components/CommentsModal';
import { MemoryDocument, Comment } from './types';

interface MemoryViewProps {
  memory: MemoryDocument;
  onAddComment: (comment: string, section: string, elementId: string) => void;
  onUpdateField?: (section: string, field: string, value: string) => void;
}

const MemoryView: React.FC<MemoryViewProps> = ({
  memory,
  onAddComment,
  onUpdateField,
}) => {
  const [expandedSection, setExpandedSection] = React.useState('introduction');
  const [expandedComments, setExpandedComments] = React.useState<string[]>([]);
  const [activeCommentElement, setActiveCommentElement] = React.useState<string | null>(null);
  const [editingField, setEditingField] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingComments, setLoadingComments] = React.useState<string[]>([]);
  const [selectedComments, setSelectedComments] = React.useState<Comment[]>([]);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = React.useState(false);
  const [newComment, setNewComment] = React.useState('');

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedSection(isExpanded ? panel : '');
  };

  const handleToggleComments = (elementId: string) => {
    setExpandedComments(prev => 
      prev.includes(elementId) 
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  };

  const handleStartEdit = (field: string, value: string) => {
    setEditingField(field);
    setEditValue(value);
  };

  const handleSaveEdit = async (section: string, field: string) => {
    if (onUpdateField && editValue.trim() !== '') {
      setIsLoading(true);
      try {
        await onUpdateField(section, field, editValue);
        setEditingField(null);
        setEditValue('');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  const handleCommentSubmit = async (elementId: string, section: string) => {
    if (newComment.trim()) {
      setLoadingComments(prev => [...prev, elementId]);
      try {
        await onAddComment(newComment, section, elementId);
        setNewComment('');
        setActiveCommentElement(null);
      } finally {
        setLoadingComments(prev => prev.filter(id => id !== elementId));
      }
    }
  };

  const handleOpenCommentsModal = (comments: Comment[]) => {
    setSelectedComments(comments);
    setIsCommentsModalOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Card
        sx={{
          background: 'transparent',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'none',
          '&:hover': {
            border: '1px solid rgba(255, 255, 255, 0.15)',
          },
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <MemoryIcon sx={{ color: 'primary.main', fontSize: 32 }} />
            <Box>
              <Typography variant="h5" sx={{ color: 'common.white', mb: 0.5 }}>
                Memory Definition
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Created on {new Date(memory.createdAt).toLocaleDateString()} by {memory.author}
              </Typography>
            </Box>
          </Box>

          <IntroductionSection
            memory={memory}
            expandedSection={expandedSection}
            comments={memory.comments}
            expandedComments={expandedComments}
            activeCommentElement={activeCommentElement}
            loadingComments={loadingComments}
            editingField={editingField}
            editValue={editValue}
            isLoading={isLoading}
            newComment={newComment}
            onAccordionChange={handleAccordionChange}
            onStartEdit={handleStartEdit}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            onEditValueChange={setEditValue}
            onToggleComments={handleToggleComments}
            onOpenCommentsModal={handleOpenCommentsModal}
            onSetActiveCommentElement={setActiveCommentElement}
            onCommentChange={setNewComment}
            onCommentSubmit={handleCommentSubmit}
          />

          <TargetUsersSection
            memory={memory}
            expandedSection={expandedSection}
            comments={memory.comments}
            expandedComments={expandedComments}
            activeCommentElement={activeCommentElement}
            loadingComments={loadingComments}
            editingField={editingField}
            editValue={editValue}
            isLoading={isLoading}
            newComment={newComment}
            onAccordionChange={handleAccordionChange}
            onStartEdit={handleStartEdit}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            onEditValueChange={setEditValue}
            onToggleComments={handleToggleComments}
            onOpenCommentsModal={handleOpenCommentsModal}
            onSetActiveCommentElement={setActiveCommentElement}
            onCommentChange={setNewComment}
            onCommentSubmit={handleCommentSubmit}
          />

          <CoreFeaturesSection
            memory={memory}
            expandedSection={expandedSection}
            comments={memory.comments}
            expandedComments={expandedComments}
            activeCommentElement={activeCommentElement}
            loadingComments={loadingComments}
            editingField={editingField}
            editValue={editValue}
            isLoading={isLoading}
            newComment={newComment}
            onAccordionChange={handleAccordionChange}
            onStartEdit={handleStartEdit}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            onEditValueChange={setEditValue}
            onToggleComments={handleToggleComments}
            onOpenCommentsModal={handleOpenCommentsModal}
            onSetActiveCommentElement={setActiveCommentElement}
            onCommentChange={setNewComment}
            onCommentSubmit={handleCommentSubmit}
          />
        </CardContent>
      </Card>

      <CommentsModal
        open={isCommentsModalOpen}
        comments={selectedComments}
        onClose={() => setIsCommentsModalOpen(false)}
      />
    </Box>
  );
};

export default MemoryView;
