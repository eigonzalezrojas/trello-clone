const express = require('express');
const router = express.Router();
const { Board, Task } = require('../models');

// Ruta para obtener todos los tableros
router.get('/boards', async (req, res) => {
  try {
    const boards = await Board.findAll();
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los tableros' });
  }
});

// Ruta para crear un nuevo tablero
router.post('/boards', async (req, res) => {
  try {
    const { name } = req.body;
    const newBoard = await Board.create({ name });
    res.json(newBoard);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el tablero' });
  }
});

// Ruta para obtener tareas de un tablero específico
router.get('/boards/:boardId/tasks', async (req, res) => {
  try {
    const { boardId } = req.params;
    const tasks = await Task.findAll({ where: { boardId } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
});

module.exports = router;