import React, { useState } from 'react';
import { Box } from '@mui/material';
import CoreFeaturesSection from './components/CoreFeaturesSection';
import { MemoryDocument, Comment } from './types';

interface MemoryViewProps {
  memory: MemoryDocument;
  onSave: (section: string, field: string, value: string) => Promise<void>;
  onAddComment: (elementId: string, section: string, content: string) => Promise<void>;
}

const MemoryView: React.FC<MemoryViewProps> = ({
  memory,
  onSave,
  onAddComment,
}) => {
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [activeCommentElement, setActiveCommentElement] = useState<string | null>(null);
  const [loadingComments, setLoadingComments] = useState<string[]>([]);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleStartEdit = (field: string, value: string) => {
    setEditingField(field);
    setEditValue(value);
  };

  const handleSaveEdit = async (section: string, field: string) => {
    setIsLoading(true);
    try {
      await onSave(section, field, editValue);
      setEditingField(null);
      setEditValue('');
    } catch (error) {
      console.error('Error saving edit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  const handleEditValueChange = (value: string) => {
    setEditValue(value);
  };

  const handleToggleComments = (elementId: string) => {
    setExpandedComments(prev => 
      prev.includes(elementId)
        ? prev.filter(id => id !== elementId)
        : [...prev, elementId]
    );
  };

  const handleOpenCommentsModal = (comments: Comment[]) => {
    // Comments modal handling can be added here if needed
  };

  const handleSetActiveCommentElement = (elementId: string | null) => {
    setActiveCommentElement(elementId);
    setNewComment('');
  };

  const handleCommentChange = (value: string) => {
    setNewComment(value);
  };

  const handleCommentSubmit = async (elementId: string, section: string) => {
    if (!newComment.trim()) return;

    setLoadingComments(prev => [...prev, elementId]);
    try {
      await onAddComment(elementId, section, newComment);
      setNewComment('');
      setActiveCommentElement(null);
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoadingComments(prev => prev.filter(id => id !== elementId));
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <CoreFeaturesSection
        coreFeatures={memory.coreFeatures}
        comments={memory.comments}
        expandedComments={expandedComments}
        activeCommentElement={activeCommentElement}
        loadingComments={loadingComments}
        editingField={editingField}
        editValue={editValue}
        isLoading={isLoading}
        newComment={newComment}
        onStartEdit={handleStartEdit}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
        onEditValueChange={handleEditValueChange}
        onToggleComments={handleToggleComments}
        onOpenCommentsModal={handleOpenCommentsModal}
        onSetActiveCommentElement={handleSetActiveCommentElement}
        onCommentChange={handleCommentChange}
        onCommentSubmit={handleCommentSubmit}
      />
    </Box>
  );
};

export default MemoryView;
