const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Rutas para las tareas
router.get('/boards/:board_id/tasks', taskController.getTasksByBoard);
router.post('/boards/:board_id/tasks', taskController.createTask);
router.get('/tasks/:id', taskController.getTaskById);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;