const Task = require('../models/Task');

// Obtener todas las tareas de un tablero
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

// Crear una nueva tarea
exports.createTask = async (req, res) => {
  try {
    const { board_id } = req.params;
    const { title, description, status } = req.body;
    const task = await Task.create({
      title,
      description,
      status: status || 'pending',
      board_id
    });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
};

// Obtener una tarea por ID
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

// Actualizar una tarea
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    await task.update({ title, description, status });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
};

// Eliminar una tarea
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