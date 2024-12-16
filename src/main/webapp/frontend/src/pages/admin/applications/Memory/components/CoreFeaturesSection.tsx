import React from 'react';
import {
  Box,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
  Tooltip,
} from '@mui/material';
import {
  Settings as FeaturesIcon,
  Category as CategoryIcon,
  Person as PersonIcon,
  Timeline as ProcessIcon,
  ShowChart as MetricIcon,
  Circle as StepIcon,
} from '@mui/icons-material';
import EditableContent from './EditableContent';
import { CoreFeatureCategories, Comment, CORE_FEATURE_CATEGORY_ORDER } from '../types';

interface CoreFeaturesSectionProps {
  coreFeatures: CoreFeatureCategories;
  comments: Comment[];
  expandedComments: string[];
  activeCommentElement: string | null;
  loadingComments: string[];
  editingField: string | null;
  editValue: string;
  isLoading: boolean;
  newComment: string;
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

const TruncatedText: React.FC<{ text: string; maxLines?: number }> = ({ text, maxLines = 2 }) => (
  <Tooltip title={text} enterDelay={500}>
    <Typography
      variant="body2"
      sx={{
        color: 'rgba(255, 255, 255, 0.7)',
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        cursor: 'pointer',
        '&:hover': {
          color: 'rgba(255, 255, 255, 0.9)',
        },
      }}
    >
      {text}
    </Typography>
  </Tooltip>
);

const CoreFeaturesSection: React.FC<CoreFeaturesSectionProps> = ({
  coreFeatures,
  comments,
  expandedComments,
  activeCommentElement,
  loadingComments,
  editingField,
  editValue,
  isLoading,
  newComment,
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

  if (!coreFeatures) {
    return null;
  }

  return (
    <Box>
      {CORE_FEATURE_CATEGORY_ORDER.map((categoryId) => {
        const category = coreFeatures[categoryId];
        if (!category) return null;

        return (
          <Box key={categoryId} sx={{ mb: 8 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ color: '#00A3FF', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CategoryIcon />
                {category.category}
              </Typography>

              <EditableContent
                content={category.overview}
                elementId={`category-${categoryId}-overview`}
                section="coreFeatures"
                field={`${categoryId}.overview`}
                comments={sectionComments.filter(c => c.elementId === `category-${categoryId}-overview`)}
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

            {category.features.map((feature, featureIndex) => (
              <Box key={featureIndex} sx={{ mb: 6, '&:last-child': { mb: 0 } }}>
                <Typography variant="h6" sx={{ color: 'white', mb: 3 }}>
                  {feature.name}
                </Typography>

                <EditableContent
                  content={feature.description}
                  elementId={`feature-${categoryId}-${featureIndex}-description`}
                  section="coreFeatures"
                  field={`${categoryId}.features[${featureIndex}].description`}
                  comments={sectionComments.filter(c => c.elementId === `feature-${categoryId}-${featureIndex}-description`)}
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

                <Grid container spacing={4} sx={{ mt: 3 }}>
                  {/* Entities */}
                  <Grid item xs={12} lg={3}>
                    <Typography variant="subtitle1" sx={{ color: '#00A3FF', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon />
                      Key Entities
                    </Typography>
                    {feature.entities.map((entity, entityIndex) => (
                      <Box
                        key={entityIndex}
                        sx={{
                          mb: 3,
                          p: 2,
                          borderLeft: '2px solid',
                          borderColor: entity.role === 'primary' ? '#00A3FF' : 'rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'space-between' }}>
                          <Typography variant="subtitle2" sx={{ color: 'white' }}>
                            {entity.name}
                          </Typography>
                          <Chip
                            label={entity.role}
                            size="small"
                            sx={{
                              bgcolor: 'transparent',
                              border: '1px solid',
                              borderColor: entity.role === 'primary' ? '#00A3FF' : 'rgba(255, 255, 255, 0.3)',
                              color: entity.role === 'primary' ? '#00A3FF' : 'white',
                            }}
                          />
                        </Box>
                        <TruncatedText text={entity.description} />
                        <List dense>
                          {entity.responsibilities.map((resp, respIndex) => (
                            <ListItem key={respIndex} sx={{ px: 0 }}>
                              <ListItemIcon sx={{ minWidth: 24 }}>
                                <StepIcon sx={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '0.5rem' }} />
                              </ListItemIcon>
                              <ListItemText
                                primary={<TruncatedText text={resp} maxLines={1} />}
                                sx={{ '& .MuiListItemText-primary': { fontSize: '0.9rem' } }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    ))}
                  </Grid>

                  {/* Processes & Metrics */}
                  <Grid item xs={12} lg={9}>
                    {feature.processes.map((process, processIndex) => (
                      <Box key={processIndex} sx={{ mb: 4, '&:last-child': { mb: 0 } }}>
                        <Typography variant="subtitle1" sx={{ color: '#00A3FF', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ProcessIcon />
                          {process.name}
                        </Typography>

                        <TruncatedText text={process.description} />

                        <Box sx={{ 
                          p: 3, 
                          borderRadius: 1,
                          bgcolor: 'rgba(0, 163, 255, 0.03)',
                          border: '1px solid rgba(0, 163, 255, 0.1)',
                          my: 3,
                        }}>
                          <Typography variant="body2" sx={{ 
                            color: 'rgba(255, 255, 255, 0.9)',
                            lineHeight: 1.8,
                            letterSpacing: '0.015em',
                            whiteSpace: 'pre-wrap',
                          }}>
                            {process.detailedFlow}
                          </Typography>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                            Process Steps:
                          </Typography>
                          <Grid container spacing={2}>
                            {process.steps.map((step, stepIndex) => (
                              <Grid item xs={12} sm={6} key={stepIndex}>
                                <ListItem sx={{ px: 0 }}>
                                  <ListItemIcon sx={{ minWidth: 36 }}>
                                    <Typography sx={{ color: '#00A3FF' }}>
                                      {stepIndex + 1}.
                                    </Typography>
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={<TruncatedText text={step} maxLines={1} />}
                                    sx={{ '& .MuiListItemText-primary': { color: 'rgba(255, 255, 255, 0.7)' } }}
                                  />
                                </ListItem>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>

                        <Box>
                          <Typography variant="subtitle2" sx={{ color: '#00A3FF', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MetricIcon />
                            Metrics & Impact
                          </Typography>
                          <Grid container spacing={2}>
                            {process.metrics.map((metric, metricIndex) => (
                              <Grid item xs={12} sm={6} key={metricIndex}>
                                <Box sx={{ 
                                  p: 2,
                                  borderLeft: '2px solid rgba(0, 163, 255, 0.3)',
                                  height: '100%',
                                }}>
                                  <Typography variant="subtitle2" sx={{ color: '#00A3FF', mb: 1 }}>
                                    {metric.metric}
                                  </Typography>
                                  <TruncatedText text={metric.description} />
                                  <Typography variant="body2" sx={{ 
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    my: 2,
                                    fontFamily: 'monospace',
                                    fontSize: '0.85rem',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                  }}>
                                    {metric.calculation}
                                  </Typography>
                                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {metric.affectedMetrics.map((affected, affectedIndex) => (
                                      <Tooltip key={affectedIndex} title={`${affected.name}: ${affected.impact}`}>
                                        <Chip
                                          label={`${affected.name}: ${affected.impact}`}
                                          size="small"
                                          sx={{
                                            maxWidth: '100%',
                                            bgcolor: 'transparent',
                                            border: '1px solid rgba(0, 163, 255, 0.3)',
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            '& .MuiChip-label': {
                                              overflow: 'hidden',
                                              textOverflow: 'ellipsis',
                                              whiteSpace: 'nowrap',
                                            },
                                          }}
                                        />
                                      </Tooltip>
                                    ))}
                                  </Box>
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      </Box>
                    ))}
                  </Grid>
                </Grid>

                {featureIndex < category.features.length - 1 && (
                  <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                )}
              </Box>
            ))}
          </Box>
        );
      })}
    </Box>
  );
};

export default CoreFeaturesSection;
