import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { KanbanBoardProps, TaskStatus } from '../types';
import TaskCard from './TaskCard';

const statusColumns: { id: TaskStatus; label: string }[] = [
  { id: 'todo', label: 'To Do' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'review', label: 'Review' },
  { id: 'done', label: 'Done' },
];

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskClick, onTaskMove }) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = destination.droppableId as TaskStatus;
    onTaskMove(draggableId, newStatus);
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 2,
          height: '100%',
          minHeight: 0,
        }}
      >
        {statusColumns.map(column => (
          <Paper
            key={column.id}
            elevation={0}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 1,
              p: 1,
              minHeight: 200,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                p: 1,
                color: 'common.white',
                fontWeight: 600,
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                mb: 1,
              }}
            >
              {column.label} ({getTasksByStatus(column.id).length})
            </Typography>

            <Droppable droppableId={column.id}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    flex: 1,
                    overflowY: 'auto',
                    minHeight: 100,
                  }}
                >
                  {getTasksByStatus(column.id).map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onClick={() => onTaskClick(task.id)}
                          />
                        </div>
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

export default KanbanBoard; 