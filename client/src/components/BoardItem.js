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
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TaskItem from './TaskItem';

function BoardItem({ board, onEdit, onDelete, onAddTask, onTaskDeleted, onMoveTask }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [tasks, setTasks] = useState(board.tasks || []);

    // Update tasks when they change on the board
    useEffect(() => {
        setTasks(board.tasks || []);
    }, [board.tasks]);

    // Functions for menu management
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    // Function to toggle task creation modal
    const toggleTaskModal = () => {
        setShowTaskModal(!showTaskModal);
        if (!showTaskModal) {
            setTaskTitle('');
            setTaskDescription('');
        }
    };

    // Function to create a new task
    const handleCreateTask = async () => {
        if (!taskTitle.trim()) return;

        try {
            const response = await fetch(`/api/boards/${board.id}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ title: taskTitle, description: taskDescription }),
            });

            if (response.ok) {
                const newTask = await response.json();
                setTasks(prevTasks => [...prevTasks, newTask]);
                onAddTask(board.id, newTask);
                toggleTaskModal();
            } else {
                throw new Error('Error creating task');
            }
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    // Function to update a task
    const handleTaskUpdated = async (updatedTask) => {
        try {
            const response = await fetch(`/api/tasks/${updatedTask.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
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
                throw new Error('Error updating task');
            }
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // Function to delete a task
    const handleTaskDeleted = async (taskId) => {
        try {
            await onTaskDeleted(taskId, board.id);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
        }
    };

    // Function to handle task movement
    const handleTaskMoved = (taskId, sourceBoardId, targetBoardId) => {
        if (sourceBoardId === board.id) {
            // Remove the task from the source board
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } else if (targetBoardId === board.id) {
            // Add the task to the target board
            const movedTask = tasks.find(task => task.id === taskId);
            if (movedTask) {
                setTasks(prevTasks => [...prevTasks, { ...movedTask, board_id: targetBoardId }]);
            }
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
                <MenuItem onClick={() => { handleMenuClose(); onEdit(board.id); }}>Edit</MenuItem>
                <MenuItem onClick={() => { handleMenuClose(); onDelete(board.id); }}>Delete</MenuItem>
            </Menu>

            <CardContent>
                {tasks.map((task, index) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        index={index}
                        onTaskUpdated={handleTaskUpdated}
                        onTaskDeleted={handleTaskDeleted}
                        onTaskMoved={handleTaskMoved}
                        boardId={board.id}
                    />
                ))}
            </CardContent>

            <CardActions>
                <IconButton
                    color="primary"
                    onClick={toggleTaskModal}
                    sx={{ marginTop: 1 }}
                >
                    <AddIcon />
                </IconButton>
            </CardActions>

            <Dialog open={showTaskModal} onClose={toggleTaskModal}>
                <DialogTitle>Create new task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleTaskModal}>Cancel</Button>
                    <Button
                        onClick={handleCreateTask}
                        variant="contained"
                        disabled={!taskTitle.trim()}
                    >
                        Create task
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default BoardItem;