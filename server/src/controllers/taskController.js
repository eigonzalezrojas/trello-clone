const Task = require('../models/Task');
const { zonedTimeToUtc } = require('date-fns-tz');

// Get task by board
exports.getTasksByBoard = async (req, res) => {
  try {
    const { board_id } = req.params;
    const tasks = await Task.findAll({ where: { board_id } });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
};

// Create task
exports.createTask = async (req, res) => {
  try {
    const { board_id } = req.params;
    const { title, description} = req.body;

    const date = new Date();
    process.env.TZ = 'America/Santiago';
    const createdAt = date.toString();

    const task = await Task.create({
      title,
      description,
      status: 'pending',
      board_id,
      created_at: createdAt
    });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al obtener la tarea' });
  }
};

// update task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.update({ title, description, status });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error updating task' });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    await task.destroy();
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
};

// Move task
exports.moveTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { targetBoardId } = req.body;

    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    await task.update({ board_id: targetBoardId });
    res.json(task);
  } catch (err) {
    console.error('Error al mover la tarea:', err.message);
    res.status(500).json({ error: 'Error al mover la tarea' });
  }
};