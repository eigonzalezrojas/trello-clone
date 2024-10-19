const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

// Rutas para los tableros
router.get('/boards', boardController.getAllBoards);
router.post('/boards', boardController.createBoard);
router.get('/boards/:id', boardController.getBoardById);
router.put('/boards/:id', boardController.updateBoard);
router.delete('/boards/:id', boardController.deleteBoard);

module.exports = router;