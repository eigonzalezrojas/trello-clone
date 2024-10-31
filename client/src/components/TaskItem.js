import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Checkbox,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Draggable } from '@hello-pangea/dnd';

function TaskItem({ task, onEditTask, onDeleteTask, onUpdateStatus, index }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isDone, setIsDone] = useState(task.status === 'done');
    const [openModal, setOpenModal] = useState(false);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleStatusChange = () => {
        const newStatus = isDone ? 'pending' : 'done';
        setIsDone(!isDone);
        onUpdateStatus(task.id, newStatus);
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // Formatear la fecha de creación
    const createdDate = new Date(task.created_at).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided) => (
                <>
                    <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{ maxWidth: 300, margin: 1, position: 'relative', cursor: 'pointer' }}
                        onClick={handleOpenModal}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                sx={{
                                    textDecoration: isDone ? 'line-through' : 'none',
                                }}
                            >
                                {task.title}
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

                            {/* Botón de tres puntos para el menú */}
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleMenuOpen(e);
                                }}
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

                    {/* Modal para mostrar la descripción y fecha de creación */}
                    <Dialog open={openModal} onClose={handleCloseModal}>
                        <DialogTitle>{task.title}</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1">
                                {task.description || "No hay descripción disponible"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                                Created: {createdDate}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseModal}>Cerrar</Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </Draggable>
    );
}

export default TaskItem;