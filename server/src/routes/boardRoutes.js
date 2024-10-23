const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');

// Rutas para los tableros
router.get('/boards', (req, res, next) => {
    console.log("GET /boards requested");  // Verificar si la ruta se llama
    next();
  }, boardController.getAllBoards);
  
  router.post('/boards', (req, res, next) => {
    console.log("POST /boards requested with body: ", req.body);  // Verificar si se llama con los datos correctos
    next();
  }, boardController.createBoard);
router.get('/boards/:id', boardController.getBoardById);
router.put('/boards/:id', boardController.updateBoard);
router.delete('/boards/:id', boardController.deleteBoard);

module.exports = router;