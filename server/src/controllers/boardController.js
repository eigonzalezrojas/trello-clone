const Board = require('../models/Board');

// Obtener todos los tableros
exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board.findAll();
    res.json(boards);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al obtener los tableros' });
  }
};

// Crear un nuevo tablero
exports.createBoard = async (req, res) => {
  try {
    const { name } = req.body;
    const owner_id = req.session.tempUserId;

    if (!name) {
      return res.status(400).json({ error: 'El nombre del tablero es obligatorio' });
    }

    const board = await Board.create({ name, owner_id });
    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al crear el tablero' });
  }
};

// Eliminar un tablero
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