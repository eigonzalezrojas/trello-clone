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
    TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Draggable } from '@hello-pangea/dnd';

function TaskItem({ task, index, onTaskUpdated, onTaskDeleted, boardId }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isDone, setIsDone] = useState(task.status === 'done');
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({
        title: task.title,
        description: task.description || '',
    });

    const handleMenuOpen = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => setAnchorEl(null);

    const handleOpenModal = () => setOpenModal(true);

    const handleCloseModal = () => setOpenModal(false);

    const handleOpenEditModal = () => {
        handleMenuClose();
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setEditFormData({
            title: task.title,
            description: task.description || '',
        });
    };

    const handleStatusChange = async () => {
        const newStatus = isDone ? 'pending' : 'done';
        try {
            const response = await fetch(`/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...task,
                    status: newStatus,
                }),
            });

            if (response.ok) {
                const updatedTask = await response.json();
                setIsDone(!isDone);
                onTaskUpdated(updatedTask);
            } else {
                throw new Error('Error updating task status');
            }
        } catch (error) {
            console.error('Error updating task status:', error);
            setIsDone(isDone);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...task,
                    ...editFormData,
                }),
            });

            if (response.ok) {
                const updatedTask = await response.json();
                onTaskUpdated(updatedTask);
                handleCloseEditModal();
            } else {
                throw new Error('Error updating task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async () => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
            try {
                await onTaskDeleted(task.id, boardId);
                handleMenuClose();
            } catch (error) {
                console.error('Error al eliminar la tarea:', error);
            }
        }
    };

    const createdDate = new Date(task.created_at).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <Draggable draggableId={String(task.id)} index={index}>
            {(provided) => (
                <>
                    <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                            maxWidth: 300,
                            margin: 1,
                            position: 'relative',
                            cursor: 'pointer',
                            opacity: isDone ? 0.7 : 1,
                            backgroundColor: isDone ? '#f5f5f5' : 'white'
                        }}
                        onClick={handleOpenModal}
                        component="div"
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                sx={{
                                    textDecoration: isDone ? 'line-through' : 'none',
                                    color: isDone ? 'text.secondary' : 'text.primary',
                                }}
                            >
                                {task.title}
                            </Typography>

                            <Box display="flex" alignItems="center" sx={{ marginTop: 1 }}>
                                <Checkbox
                                    checked={isDone}
                                    onChange={handleStatusChange}
                                    color={isDone ? "success" : "primary"}
                                    size="small"
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    Status: {isDone ? 'Finished' : 'Pending'}
                                </Typography>
                            </Box>

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
                                <MenuItem onClick={handleOpenEditModal}>
                                    Edit
                                </MenuItem>
                                <MenuItem onClick={handleDeleteTask}>
                                    Delete
                                </MenuItem>
                            </Menu>
                        </CardContent>
                    </Card>

                    {/* Modal to see details */}
                    <Dialog open={openModal} onClose={handleCloseModal}>
                        <DialogTitle>{task.title}</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1">
                                {task.description || "No description available"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                                Created: {createdDate}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseModal}>Close</Button>
                        </DialogActions>
                    </Dialog>

                    {/* Modal to edit */}
                    <Dialog open={openEditModal} onClose={handleCloseEditModal}>
                        <form onSubmit={handleEditSubmit}>
                            <DialogTitle>Edit task</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Title"
                                    type="text"
                                    fullWidth
                                    value={editFormData.title}
                                    onChange={(e) => setEditFormData({
                                        ...editFormData,
                                        title: e.target.value
                                    })}
                                    required
                                />
                                <TextField
                                    margin="dense"
                                    label="Description"
                                    type="text"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    value={editFormData.description}
                                    onChange={(e) => setEditFormData({
                                        ...editFormData,
                                        description: e.target.value
                                    })}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseEditModal}>Cancel</Button>
                                <Button type="submit">Save</Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                </>
            )}
        </Draggable>
    );
}

export default TaskItem;