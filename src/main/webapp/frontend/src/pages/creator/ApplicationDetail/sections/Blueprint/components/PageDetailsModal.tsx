import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Divider,
  Collapse,
} from '@mui/material';
import {
  Close as CloseIcon,
  Comment as CommentIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';

interface PageSection {
  id: string;
  name: string;
  description: string;
  type: 'content' | 'form' | 'list' | 'grid' | 'custom';
}

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  type: 'suggestion' | 'feedback' | 'question';
}

interface PageDetailsModalProps {
  open: boolean;
  onClose: () => void;
  pageId: string;
  pageTitle: string;
  pageType: 'page' | 'modal' | 'dialog';
}

const PageDetailsModal: React.FC<PageDetailsModalProps> = ({
  open,
  onClose,
  pageId,
  pageTitle,
  pageType,
}) => {
  const [sections] = React.useState<PageSection[]>([
    {
      id: '1',
      name: 'Header',
      description: 'Main page header with title and actions',
      type: 'content',
    },
    {
      id: '2',
      name: 'Content Area',
      description: 'Primary content section',
      type: 'content',
    },
    {
      id: '3',
      name: 'Action Buttons',
      description: 'Footer with action buttons',
      type: 'custom',
    },
  ]);

  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);
  const [newComment, setNewComment] = React.useState('');
  const [comments, setComments] = React.useState<Record<string, Comment[]>>({
    '1': [
      {
        id: 1,
        author: 'John Smith',
        content: 'We should add a breadcrumb navigation here',
        timestamp: new Date().toISOString(),
        type: 'suggestion',
      },
    ],
  });

  const handleAddComment = (sectionId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: 'Current User',
      content: newComment,
      timestamp: new Date().toISOString(),
      type: 'suggestion',
    };

    setComments(prev => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), comment],
    }));
    setNewComment('');
  };

  const handleExpandSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'rgba(13, 25, 41, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" sx={{ color: 'common.white' }}>
              {pageTitle}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Type: {pageType}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ color: 'common.white', mb: 2 }}>
            Page Sections
          </Typography>

          <List>
            {sections.map((section, index) => (
              <React.Fragment key={section.id}>
                {index > 0 && <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />}
                <ListItem
                  sx={{
                    py: 2,
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.02)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2" sx={{ color: 'common.white' }}>
                          {section.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {section.description}
                        </Typography>
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleExpandSection(section.id)}
                        sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        <CommentIcon fontSize="small" />
                        {comments[section.id]?.length > 0 && (
                          <Typography
                            variant="caption"
                            sx={{
                              position: 'absolute',
                              top: -8,
                              right: -8,
                              bgcolor: '#00A3FF',
                              color: 'white',
                              borderRadius: '50%',
                              width: 16,
                              height: 16,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {comments[section.id].length}
                          </Typography>
                        )}
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleExpandSection(section.id)}
                        sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        {expandedSection === section.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </Box>
                  </Box>

                  <Collapse in={expandedSection === section.id}>
                    <Box sx={{ mt: 2, pl: 2 }}>
                      <Typography variant="subtitle2" sx={{ color: 'common.white', mb: 1 }}>
                        Feedback & Suggestions
                      </Typography>
                      {(comments[section.id] || []).map(comment => (
                        <Box
                          key={comment.id}
                          sx={{
                            p: 1.5,
                            mb: 1,
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: 1,
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <Typography variant="subtitle2" sx={{ color: '#00A3FF', flex: 1 }}>
                              {comment.author}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                              {new Date(comment.timestamp).toLocaleString()}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            {comment.content}
                          </Typography>
                        </Box>
                      ))}
                      <Box sx={{ mt: 2 }}>
                        <TextField
                          fullWidth
                          size="small"
                          placeholder="Add feedback or suggestion..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          sx={{
                            mb: 1,
                            '& .MuiOutlinedInput-root': {
                              color: 'common.white',
                              '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                            },
                          }}
                        />
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleAddComment(section.id)}
                          disabled={!newComment.trim()}
                          sx={{
                            bgcolor: 'rgba(0, 163, 255, 0.1)',
                            '&:hover': { bgcolor: 'rgba(0, 163, 255, 0.2)' },
                          }}
                        >
                          Add Feedback
                        </Button>
                      </Box>
                    </Box>
                  </Collapse>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PageDetailsModal; 