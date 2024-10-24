const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

// Obtener todos los tableros
router.get('/boards', boardController.getAllBoards);

// Crear un nuevo tablero
router.post('/boards', boardController.createBoard);

// Eliminar un tablero
router.delete('/boards/:id', boardController.deleteBoard);

module.exports = router;