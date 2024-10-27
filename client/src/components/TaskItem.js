import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';

function TaskItem({ task, onEditTask, onDeleteTask }) {
    return (
        <Card sx={{ maxWidth: 300, margin: 1 }}>
            <CardContent>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {task.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                    Status: {task.status}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => onEditTask(task.id)} size="small">
                    Editar
                </Button>
                <Button onClick={() => onDeleteTask(task.id)} size="small" color="error">
                    Eliminar
                </Button>
            </CardActions>
        </Card>
    );
}

export default TaskItem;