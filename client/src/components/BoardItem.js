import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function BoardItem({ board, onEdit, onDelete, onCreateTask }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const toggleTaskModal = () => setShowTaskModal(!showTaskModal);

    const handleCreateTask = () => {
        onCreateTask(board.id, { title: taskTitle, description: taskDescription });
        setTaskTitle('');
        setTaskDescription('');
        toggleTaskModal();
    };

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
        <Card sx={{ maxWidth: 300, minWidth: 250, marginBottom: 2 }}>
            <CardHeader
                title={board.name}
                sx={{ backgroundColor: '#1976d2', color: '#fff' }}
                action={
                    <IconButton onClick={handleMenuOpen} color="inherit">
                        <MoreVertIcon />
                    </IconButton>
                }
            />
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => { handleMenuClose(); onEdit(board.id); }}>Editar</MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); onDelete(board.id); }}>Eliminar</MenuItem>
            </Menu>
            <CardContent>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={toggleTaskModal}
                    sx={{ marginTop: 1 }}
                >
                    Add Task
                </Button>
            </CardContent>

            {/* Modal para crear tarea */}
            <Dialog open={showTaskModal} onClose={toggleTaskModal}>
                <DialogTitle>Crear Nueva Tarea</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Título"
                        fullWidth
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Descripción"
                        fullWidth
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleTaskModal}>Cancelar</Button>
                    <Button onClick={handleCreateTask} variant="contained">
                        Crear Tarea
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default BoardItem;