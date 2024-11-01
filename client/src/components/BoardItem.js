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

function BoardItem({ board, onEdit, onDelete, onAddTask, onTaskDeleted }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [tasks, setTasks] = useState(board.tasks || []);

    // Funciones para el manejo del menú
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    // Función para alternar el modal de creación de tareas
    const toggleTaskModal = () => {
        setShowTaskModal(!showTaskModal);
        if (!showTaskModal) {
            setTaskTitle('');
            setTaskDescription('');
        }
    };

    // Función para crear una nueva tarea
    const handleCreateTask = async () => {
        if (!taskTitle.trim()) return;

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
                setTasks([...tasks, newTask]);
                onAddTask(board.id, newTask);
                toggleTaskModal();
            } else {
                throw new Error('Error al crear la tarea');
            }
        } catch (error) {
            console.error("Error al crear la tarea:", error);
        }
    };

    // Función para actualizar una tarea
    const handleTaskUpdated = async (updatedTask) => {
        try {
            const response = await fetch(`/api/tasks/${updatedTask.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });

            if (response.ok) {
                const result = await response.json();
                setTasks(prevTasks =>
                    prevTasks.map(task =>
                        task.id === result.id ? result : task
                    )
                );
            } else {
                throw new Error('Error al actualizar la tarea');
            }
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        }
    };

    // Función para eliminar una tarea
    const handleTaskDeleted = async (taskId) => {
        try {
            await onTaskDeleted(taskId, board.id);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
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
                {tasks.map((task, index) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        index={index}
                        onTaskUpdated={handleTaskUpdated}
                        onTaskDeleted={handleTaskDeleted}
                        boardId={board.id}
                    />
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
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Descripción"
                        fullWidth
                        multiline
                        rows={4}
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleTaskModal}>Cancelar</Button>
                    <Button
                        onClick={handleCreateTask}
                        variant="contained"
                        disabled={!taskTitle.trim()}
                    >
                        Crear Tarea
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default BoardItem;