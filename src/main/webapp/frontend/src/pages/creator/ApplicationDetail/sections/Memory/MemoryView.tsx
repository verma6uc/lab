import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  IconButton,
  Collapse,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Memory as MemoryIcon,
  Send as SendIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  Adjust as TargetIcon,
  Lightbulb as InsightIcon,
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon,
  Group as GroupIcon,
  Settings as FeaturesIcon,
  Category as CategoryIcon,
  Comment as CommentIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  avatarUrl?: string;
  section: string;
  elementId: string;
}

interface CoreFeature {
  category: string;
  features: {
    name: string;
    description: string;
  }[];
}

interface MemoryDocument {
  introduction: {
    productName: string;
    summary: string;
    problemStatement: string;
    intendedOutcome: string;
  };
  targetUsers: {
    personas: {
      name: string;
      description: string;
    }[];
    painPoints: string[];
    contexts: string[];
  };
  coreFeatures: CoreFeature[];
  createdAt: string;
  author: string;
  comments: Comment[];
}

interface MemoryViewProps {
  memory: MemoryDocument;
  onAddComment: (comment: string, section: string, elementId: string) => void;
  onUpdateField?: (section: string, field: string, value: string) => void;
}

const MemoryView: React.FC<MemoryViewProps> = ({ memory, onAddComment, onUpdateField }) => {
  const [newComment, setNewComment] = React.useState('');
  const [expandedSection, setExpandedSection] = React.useState('introduction');
  const [expandedComments, setExpandedComments] = React.useState<string[]>([]);
  const [activeCommentElement, setActiveCommentElement] = React.useState<string | null>(null);
  const [editingField, setEditingField] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingComments, setLoadingComments] = React.useState<string[]>([]);
  const [selectedComments, setSelectedComments] = React.useState<Comment[]>([]);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = React.useState(false);

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

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    if (isExpanded) {
      setExpandedSection(panel);
    }
  };

  const toggleComments = (elementId: string) => {
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

  const handleOpenCommentsModal = (comments: Comment[]) => {
    setSelectedComments(comments);
    setIsCommentsModalOpen(true);
  };

  const renderCommentsModal = () => (
    <Dialog 
      open={isCommentsModalOpen} 
      onClose={() => setIsCommentsModalOpen(false)}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(13, 25, 41, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }
      }}
    >
      <DialogTitle sx={{ 
        color: 'common.white',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}>
        <CommentIcon sx={{ color: '#00A3FF' }} />
        Feedback History
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <List disablePadding>
          {selectedComments.map((comment, index) => (
            <ListItem
              key={comment.id}
              alignItems="flex-start"
              sx={{
                px: 0,
                py: 2,
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`,
                '@keyframes fadeIn': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(10px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
            >
              <ListItemAvatar>
                <Avatar 
                  src={comment.avatarUrl} 
                  sx={{ 
                    width: 40, 
                    height: 40,
                    border: '2px solid rgba(0, 163, 255, 0.2)',
                    bgcolor: 'rgba(0, 163, 255, 0.1)',
                  }}
                >
                  <PersonIcon sx={{ color: '#00A3FF' }} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexWrap: { xs: 'wrap', sm: 'nowrap' },
                    gap: 1,
                  }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: 'common.white',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                      }}
                    >
                      {comment.author}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: '0.75rem',
                      }}
                    >
                      {new Date(comment.timestamp).toLocaleString()}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      mt: 1,
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {comment.content}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Button
          onClick={() => setIsCommentsModalOpen(false)}
          sx={{
            color: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
              color: '#00A3FF',
              bgcolor: 'rgba(0, 163, 255, 0.1)',
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderCommentSection = (elementId: string, section: string) => {
    const elementComments = memory.comments?.filter(c => c.elementId === elementId) || [];
    const isExpanded = expandedComments.includes(elementId);
    const isActive = activeCommentElement === elementId;
    const isCommentLoading = loadingComments.includes(elementId);

    return (
      <Box sx={{ mt: 1 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          px: { xs: 0.5, sm: 1 },
        }}>
          <IconButton
            size="small"
            onClick={() => toggleComments(elementId)}
            sx={{
              color: elementComments.length > 0 ? '#00A3FF' : 'rgba(255, 255, 255, 0.5)',
              bgcolor: elementComments.length > 0 ? 'rgba(0, 163, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              transition: 'all 0.3s ease',
              transform: isExpanded ? 'rotate(-180deg)' : 'rotate(0deg)',
              '&:hover': { 
                bgcolor: elementComments.length > 0 ? 'rgba(0, 163, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                transform: isExpanded ? 'rotate(-180deg) scale(1.05)' : 'scale(1.05)',
              },
            }}
          >
            <CommentIcon fontSize="small" />
          </IconButton>
          <Button
            size="small"
            onClick={() => handleOpenCommentsModal(elementComments)}
            sx={{ 
              color: 'rgba(255, 255, 255, 0.5)',
              minWidth: 'auto',
              p: 0.5,
              '&:hover': {
                color: '#00A3FF',
                bgcolor: 'transparent',
              },
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'inherit',
                transition: 'all 0.3s ease',
              }}
            >
              {elementComments.length} {elementComments.length === 1 ? 'comment' : 'comments'}
            </Typography>
          </Button>
          <Button
            size="small"
            onClick={() => setActiveCommentElement(isActive ? null : elementId)}
            sx={{
              color: isActive ? '#00A3FF' : 'rgba(255, 255, 255, 0.7)',
              transition: 'all 0.3s ease',
              ml: { xs: 'auto', sm: 'auto' },
              order: { xs: 2, sm: 2 },
              '&:hover': { 
                bgcolor: 'rgba(0, 163, 255, 0.1)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            Add feedback
          </Button>
        </Box>

        <Collapse 
          in={isExpanded || isActive}
          timeout={300}
          sx={{
            '& .MuiCollapse-wrapperInner': {
              transition: 'all 0.3s ease',
            },
          }}
        >
          <Box sx={{ 
            pl: { xs: 2, sm: 4 }, 
            mt: 1,
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              left: { xs: '8px', sm: '16px' },
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'rgba(0, 163, 255, 0.2)',
              borderRadius: '4px',
            }
          }}>
            {elementComments.length > 0 && (
              <List disablePadding>
                {elementComments.map((comment, index) => (
                  <ListItem
                    key={comment.id}
                    alignItems="flex-start"
                    sx={{
                      px: 0,
                      py: 1,
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      animation: `fadeIn 0.3s ease-out ${index * 0.1}s both`,
                      '@keyframes fadeIn': {
                        from: {
                          opacity: 0,
                          transform: 'translateY(10px)',
                        },
                        to: {
                          opacity: 1,
                          transform: 'translateY(0)',
                        },
                      },
                      '&:hover': {
                        bgcolor: 'rgba(13, 25, 41, 0.3)',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar 
                        src={comment.avatarUrl} 
                        sx={{ 
                          width: { xs: 28, sm: 32 }, 
                          height: { xs: 28, sm: 32 },
                          border: '2px solid rgba(0, 163, 255, 0.2)',
                          bgcolor: 'rgba(0, 163, 255, 0.1)',
                        }}
                      >
                        <PersonIcon sx={{ 
                          color: '#00A3FF',
                          fontSize: { xs: 16, sm: 20 },
                        }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          flexWrap: { xs: 'wrap', sm: 'nowrap' },
                          gap: { xs: 0.5, sm: 1 },
                        }}>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              color: 'common.white',
                              fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                            }}
                          >
                            {comment.author}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: 'rgba(255, 255, 255, 0.5)',
                              fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                              width: { xs: '100%', sm: 'auto' },
                              order: { xs: 2, sm: 1 },
                            }}
                          >
                            {new Date(comment.timestamp).toLocaleString()}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'rgba(255, 255, 255, 0.7)', 
                            mt: 0.5,
                            lineHeight: 1.6,
                            fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                          }}
                        >
                          {comment.content}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}

            {isActive && (
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                mt: 2,
                flexDirection: { xs: 'column', sm: 'row' },
              }}>
                {renderTextField(
                  newComment,
                  (e) => setNewComment(e.target.value),
                  'Add your feedback...',
                  2
                )}
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleCommentSubmit(elementId, section)}
                  disabled={!newComment.trim() || isCommentLoading}
                  sx={{
                    minWidth: { xs: '100%', sm: 'auto' },
                    px: 2,
                    py: { xs: 1, sm: 'auto' },
                    bgcolor: 'rgba(0, 163, 255, 0.2)',
                    border: '1px solid rgba(0, 163, 255, 0.3)',
                    color: '#00A3FF',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(0, 163, 255, 0.3)',
                      transform: 'translateY(-1px)',
                    },
                    '&:disabled': {
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      color: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  {isCommentLoading ? (
                    <CircularProgress size={20} thickness={4} sx={{ color: '#00A3FF' }} />
                  ) : (
                    <SendIcon />
                  )}
                </Button>
              </Box>
            )}
          </Box>
        </Collapse>
      </Box>
    );
  };

  const renderTextField = (
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    rows: number = 2,
    autoFocus: boolean = false
  ) => (
    <TextField
      fullWidth
      multiline
      size="small"
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoFocus={autoFocus}
      sx={{
        '& .MuiOutlinedInput-root': {
          color: 'common.white',
          bgcolor: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.3s ease',
          '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(0, 163, 255, 0.3)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'rgba(0, 163, 255, 0.5)',
          },
        },
      }}
    />
  );

  const renderEditableContent = (
    content: string,
    elementId: string,
    section: string,
    field: string
  ) => {
    const isEditing = editingField === elementId;

    return (
      <Box>
        <Box
          sx={{
            position: 'relative',
            p: { xs: 1.5, sm: 2 },
            background: isEditing
              ? 'rgba(13, 25, 41, 0.7)'
              : 'transparent',
            backdropFilter: 'blur(20px)',
            borderRadius: 1,
            border: isEditing ? '1px solid rgba(0, 163, 255, 0.2)' : 'none',
            boxShadow: isEditing ? '0 8px 32px rgba(0, 163, 255, 0.1)' : 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              '& .edit-button': {
                opacity: 1,
              },
              background: isEditing ? 'rgba(13, 25, 41, 0.7)' : 'rgba(13, 25, 41, 0.3)',
            },
          }}
        >
          {isEditing ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {renderTextField(editValue, (e) => setEditValue(e.target.value), 'Enter your text...', 3, true)}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <IconButton
                  size="small"
                  onClick={() => handleSaveEdit(section, field)}
                  disabled={isLoading || !editValue.trim()}
                  sx={{
                    color: '#00A3FF',
                    bgcolor: 'rgba(0, 163, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      bgcolor: 'rgba(0, 163, 255, 0.2)',
                      transform: 'scale(1.05)',
                    },
                    '&.Mui-disabled': {
                      color: 'rgba(255, 255, 255, 0.3)',
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={20} thickness={4} sx={{ color: '#00A3FF' }} />
                  ) : (
                    <CheckIcon fontSize="small" />
                  )}
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                  sx={{
                    color: 'error.main',
                    bgcolor: 'rgba(244, 67, 54, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      bgcolor: 'rgba(244, 67, 54, 0.2)',
                      transform: 'scale(1.05)',
                    },
                    '&.Mui-disabled': {
                      color: 'rgba(255, 255, 255, 0.3)',
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  color: 'common.white',
                  flex: 1,
                  minHeight: '24px',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {content}
              </Typography>
              <IconButton
                className="edit-button"
                size="small"
                onClick={() => handleStartEdit(elementId, content)}
                sx={{
                  opacity: 0,
                  transition: 'all 0.3s ease',
                  color: '#00A3FF',
                  bgcolor: 'rgba(0, 163, 255, 0.1)',
                  '&:hover': { 
                    bgcolor: 'rgba(0, 163, 255, 0.2)',
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
        {renderCommentSection(elementId, section)}
      </Box>
    );
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
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'flex', alignItems: 'center', gap: 1 }}>
                <TimeIcon fontSize="small" />
                Created on {new Date(memory.createdAt).toLocaleDateString()} by {memory.author}
              </Typography>
            </Box>
          </Box>

          {/* Introduction Section */}
          <Accordion
            expanded={expandedSection === 'introduction'}
            onChange={handleAccordionChange('introduction')}
            sx={{
              bgcolor: 'transparent',
              '&:before': { display: 'none' },
              boxShadow: 'none',
              transition: 'all 0.3s ease-in-out',
              '& .MuiAccordionSummary-root': {
                transition: 'all 0.3s ease',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover': { 
                  bgcolor: 'rgba(0, 163, 255, 0.05)',
                  borderBottom: '1px solid rgba(0, 163, 255, 0.2)',
                },
              },
              '& .MuiAccordionDetails-root': {
                transition: 'all 0.3s ease',
                background: 'rgba(13, 25, 41, 0.3)',
                backdropFilter: 'blur(20px)',
                borderRadius: '0 0 12px 12px',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ 
                color: '#00A3FF',
                transition: 'transform 0.3s ease',
                transform: expandedSection === 'introduction' ? 'rotate(180deg)' : 'rotate(0deg)',
              }} />}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StarIcon sx={{ color: '#00A3FF' }} />
                <Typography variant="h6" sx={{ color: 'common.white' }}>
                  Introduction & Summary
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1 }}>
                    Product Name
                  </Typography>
                  {renderEditableContent(
                    memory.introduction.productName,
                    'intro-product-name',
                    'introduction',
                    'productName'
                  )}
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1 }}>
                    One-Line Summary
                  </Typography>
                  {renderEditableContent(
                    memory.introduction.summary,
                    'intro-summary',
                    'introduction',
                    'summary'
                  )}
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1 }}>
                    Core Problem Statement
                  </Typography>
                  {renderEditableContent(
                    memory.introduction.problemStatement,
                    'intro-problem',
                    'introduction',
                    'problemStatement'
                  )}
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1 }}>
                    Intended Outcome
                  </Typography>
                  {renderEditableContent(
                    memory.introduction.intendedOutcome,
                    'intro-outcome',
                    'introduction',
                    'intendedOutcome'
                  )}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Target Users Section */}
          <Accordion
            expanded={expandedSection === 'targetUsers'}
            onChange={handleAccordionChange('targetUsers')}
            sx={{
              bgcolor: 'transparent',
              '&:before': { display: 'none' },
              boxShadow: 'none',
              transition: 'all 0.3s ease-in-out',
              '& .MuiAccordionSummary-root': {
                transition: 'all 0.3s ease',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover': { 
                  bgcolor: 'rgba(0, 163, 255, 0.05)',
                  borderBottom: '1px solid rgba(0, 163, 255, 0.2)',
                },
              },
              '& .MuiAccordionDetails-root': {
                transition: 'all 0.3s ease',
                background: 'rgba(13, 25, 41, 0.3)',
                backdropFilter: 'blur(20px)',
                borderRadius: '0 0 12px 12px',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ 
                color: '#00A3FF',
                transition: 'transform 0.3s ease',
                transform: expandedSection === 'targetUsers' ? 'rotate(180deg)' : 'rotate(0deg)',
              }} />}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <GroupIcon sx={{ color: '#00A3FF' }} />
                <Typography variant="h6" sx={{ color: 'common.white' }}>
                  Target Users & Personas
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                {memory.targetUsers?.personas?.map((persona, index) => (
                  <Box key={index}>
                    <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1 }}>
                      {persona.name}
                    </Typography>
                    {renderEditableContent(
                      persona.description,
                      `persona-${index}`,
                      'targetUsers',
                      `personas[${index}].description`
                    )}
                  </Box>
                ))}
                <Box>
                  <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 1 }}>
                    Pain Points
                  </Typography>
                  {memory.targetUsers?.painPoints?.map((point, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      {renderEditableContent(
                        point,
                        `pain-point-${index}`,
                        'targetUsers',
                        `painPoints[${index}]`
                      )}
                    </Box>
                  ))}
                </Box>
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
                  {renderCommentSection('contexts', 'targetUsers')}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Core Features Section */}
          <Accordion
            expanded={expandedSection === 'coreFeatures'}
            onChange={handleAccordionChange('coreFeatures')}
            sx={{
              bgcolor: 'transparent',
              '&:before': { display: 'none' },
              boxShadow: 'none',
              transition: 'all 0.3s ease-in-out',
              '& .MuiAccordionSummary-root': {
                transition: 'all 0.3s ease',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover': { 
                  bgcolor: 'rgba(0, 163, 255, 0.05)',
                  borderBottom: '1px solid rgba(0, 163, 255, 0.2)',
                },
              },
              '& .MuiAccordionDetails-root': {
                transition: 'all 0.3s ease',
                background: 'rgba(13, 25, 41, 0.3)',
                backdropFilter: 'blur(20px)',
                borderRadius: '0 0 12px 12px',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ 
                color: '#00A3FF',
                transition: 'transform 0.3s ease',
                transform: expandedSection === 'coreFeatures' ? 'rotate(180deg)' : 'rotate(0deg)',
              }} />}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FeaturesIcon sx={{ color: '#00A3FF' }} />
                <Typography variant="h6" sx={{ color: 'common.white' }}>
                  Core Features & Capabilities
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mt: 2 }}>
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
                        {renderEditableContent(
                          feature.description,
                          `feature-${categoryIndex}-${featureIndex}`,
                          'coreFeatures',
                          `features[${categoryIndex}].description`
                        )}
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
      {renderCommentsModal()}
    </Box>
  );
};

export default MemoryView; 