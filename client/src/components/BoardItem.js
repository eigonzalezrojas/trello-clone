import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TaskItem from './TaskItem';

function BoardItem({ board, onEdit, onDelete, onAddTask }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    // Funciones para el manejo del menú
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    // Función para alternar el modal de creación de tareas
    const toggleTaskModal = () => setShowTaskModal(!showTaskModal);

    // Función para crear una nueva tarea
    const handleCreateTask = async () => {
        try {
            const response = await fetch(`/api/boards/${board.id}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: taskTitle, description: taskDescription }),
            });
            if (response.ok) {
                const newTask = await response.json();
                onAddTask(board.id, newTask);
                setTaskTitle('');
                setTaskDescription('');
                toggleTaskModal();
            }
        } catch (error) {
            console.error("Error al crear la tarea:", error);
        }
    };

    return (
        <Card sx={{ maxWidth: 300, minWidth: 250, margin: 2 }}>
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
                {board.tasks && board.tasks.length > 0 && board.tasks.map((task, index) => (
                    <TaskItem key={task.id} task={task} index={index} />
                ))}
            </CardContent>

            <CardActions>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={toggleTaskModal}
                    sx={{ marginTop: 1 }}
                >
                    Add Task
                </Button>
            </CardActions>

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