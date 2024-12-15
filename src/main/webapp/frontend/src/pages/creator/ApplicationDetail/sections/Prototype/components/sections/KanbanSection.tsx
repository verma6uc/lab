import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
} from '@mui/material';
import {
  DragIndicator as DragIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { SectionData, KanbanColumn } from '../../types.ts';

interface KanbanSectionProps {
  section: SectionData;
}

const KanbanSection: React.FC<KanbanSectionProps> = ({ section }) => {
  const [columns, setColumns] = useState(section.config.kanban || []);

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = columns.find(col => col.id === source.droppableId);
    const destColumn = columns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same column
      const newItems = Array.from(sourceColumn.items);
      const [removed] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removed);

      const newColumns = columns.map(col =>
        col.id === source.droppableId
          ? { ...col, items: newItems }
          : col
      );

      setColumns(newColumns);
    } else {
      // Move between columns
      const sourceItems = Array.from(sourceColumn.items);
      const destItems = Array.from(destColumn.items);
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      const newColumns = columns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, items: sourceItems };
        }
        if (col.id === destination.droppableId) {
          return { ...col, items: destItems };
        }
        return col;
      });

      setColumns(newColumns);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 2,
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: 'background.paper',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'primary.main',
            borderRadius: 4,
          },
        }}
      >
        {columns.map((column) => (
          <Paper
            key={column.id}
            sx={{
              width: 300,
              flexShrink: 0,
              bgcolor: 'background.default',
            }}
          >
            <Box
              sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <Typography variant="h6">
                {column.title}
              </Typography>
              <IconButton size="small">
                <AddIcon />
              </IconButton>
            </Box>

            <Droppable droppableId={column.id}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    p: 1,
                    minHeight: 500,
                  }}
                >
                  {column.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          sx={{
                            mb: 1,
                            bgcolor: snapshot.isDragging
                              ? 'action.hover'
                              : 'background.paper',
                          }}
                        >
                          <CardContent>
                            <Box
                              {...provided.dragHandleProps}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mb: 1,
                              }}
                            >
                              <DragIcon
                                sx={{ mr: 1, color: 'text.secondary' }}
                              />
                              <Typography variant="subtitle2">
                                {item.title}
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              {item.description}
                            </Typography>
                            <Chip
                              label={item.priority}
                              size="small"
                              color={getPriorityColor(item.priority)}
                            />
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Paper>
        ))}
      </Box>
    </DragDropContext>
  );
};

export default KanbanSection; 