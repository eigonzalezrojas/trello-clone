const express = require('express');
const router = express.Router();
const pool = require('../../db');

// Ruta para obtener todos los tableros
router.get('/boards', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM boards');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al obtener los tableros' });
  }
});

// Ruta para crear un nuevo tablero
router.post('/boards', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query('INSERT INTO boards (name) VALUES ($1) RETURNING *', [name]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al crear el tablero' });
  }
});

// Ruta para obtener un tablero por ID
router.get('/boards/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM boards WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tablero no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al obtener el tablero' });
  }
});

// Ruta para actualizar un tablero por ID
router.put('/boards/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await pool.query(
      'UPDATE boards SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tablero no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al actualizar el tablero' });
  }
});

// Ruta para eliminar un tablero por ID
router.delete('/boards/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM boards WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tablero no encontrado' });
    }
    res.json({ message: 'Tablero eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al eliminar el tablero' });
  }
});

module.exports = router;