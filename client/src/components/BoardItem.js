import React, { useState, useEffect } from 'react';
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
import { Droppable } from '@hello-pangea/dnd';

function BoardItem({ board, onEdit, onDelete, onAddTask }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`/api/boards/${board.id}/tasks`)
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error("Error al cargar tareas:", error));
    }, [board.id]);

    // Funciones para el manejo del menú
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    // Función para alternar el modal de creación de tareas
    const toggleTaskModal = () => setShowTaskModal(!showTaskModal);

    // Función para crear una nueva tarea
    const handleCreateTask = () => {
        fetch(`/api/boards/${board.id}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: taskTitle, description: taskDescription }),
        })
            .then(response => response.json())
            .then(newTask => {
                setTasks([...tasks, newTask]);
                setTaskTitle('');
                setTaskDescription('');
                toggleTaskModal();
            })
            .catch(error => console.error("Error al crear la tarea:", error));
    };

    return (
        <Droppable droppableId={board.id.toString()}>
            {(provided) => (
                <Card
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{ maxWidth: 300, minWidth: 250, margin: 2 }}
                >
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
                        {tasks && tasks.length > 0 && tasks.map((task, index) => (
                            task.id ? <TaskItem key={task.id} task={task} index={index} /> : null
                        ))}
                        {provided.placeholder}
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
            )}
        </Droppable>
    );
}

export default BoardItem;