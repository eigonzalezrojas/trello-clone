const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/boards/:board_id/tasks', taskController.getTasksByBoard);
router.post('/boards/:board_id/tasks', taskController.createTask);
router.get('/tasks/:id', taskController.getTaskById);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.put('/tasks/:taskId/move', taskController.moveTask);

module.exports = router;