import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Checkbox, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function TaskItem({ task, onEditTask, onDeleteTask, onUpdateStatus }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isDone, setIsDone] = useState(task.status === 'done');

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleStatusChange = () => {
        const newStatus = isDone ? 'pending' : 'done';
        setIsDone(!isDone);
        onUpdateStatus(task.id, newStatus); // Llama a la función para actualizar el estado
    };

    // Formatear la fecha de creación
    const createdDate = new Date(task.created_at).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    });

    return (
        <Card sx={{ maxWidth: 300, margin: 1, position: 'relative' }}>
            <CardContent>
                <Typography
                    variant="h6"
                    sx={{
                        textDecoration: isDone ? 'line-through' : 'none',
                    }}
                >
                    {task.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {task.description}
                </Typography>

                {/* Sección de Status con Checkbox */}
                <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                    <Checkbox
                        checked={isDone}
                        onChange={handleStatusChange}
                        color="primary"
                        size="small"
                    />
                    <Typography variant="body2" color="text.secondary">
                        Status: {isDone ? 'done' : 'pending'}
                    </Typography>
                </Box>

                {/* Fecha de creación */}
                <Typography variant="caption" color="text.secondary" sx={{ marginTop: 1, display: 'block' }}>
                   {createdDate}
                </Typography>

                {/* Botón de tres puntos para el menú */}
                <IconButton
                    onClick={handleMenuOpen}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => { handleMenuClose(); onEditTask(task.id); }}>
                        Editar
                    </MenuItem>
                    <MenuItem onClick={() => { handleMenuClose(); onDeleteTask(task.id); }}>
                        Eliminar
                    </MenuItem>
                </Menu>
            </CardContent>
        </Card>
    );
}

export default TaskItem;