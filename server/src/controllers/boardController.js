const Board = require('../models/Board');

// Get all boards
exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board.findAll();
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los tableros' });
  }
};

// Edit board
exports.updateBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const board = await Board.findByPk(id);
    if (!board) {
      return res.status(404).json({ error: 'Tablero no encontrado' });
    }

    board.name = name;
    await board.save();

    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al actualizar el tablero' });
  }
};

// Create board
exports.createBoard = async (req, res) => {
  try {
    const { name } = req.body;
    const owner_id = req.session.tempUserId;

    if (!name) {
      return res.status(400).json({ error: 'El nombre del tablero es obligatorio' });
    }

    if (!owner_id) {
      return res.status(400).json({ error: 'Usuario temporal no encontrado en la sesión' });
    }

    const board = await Board.create({ name, owner_id });
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el tablero' });
  }
};

// Delete board
exports.deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await Board.findByPk(id);
    if (!board) {
      return res.status(404).json({ error: 'Tablero no encontrado' });
    }
    await board.destroy();
    res.json({ message: 'Tablero eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al eliminar el tablero' });
  }
};