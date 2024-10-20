const { Board } = require('../models');

// Middleware para gestionar la creación de tableros predeterminados
const createDefaultBoards = async (req, res, next) => {
  try {
    // Verificar si el usuario temporal ya tiene tableros creados
    const existingBoards = await Board.findAll({
      where: { owner_id: req.tempUser.id }
    });

    if (existingBoards.length === 0) {
      // Si no existen tableros, crear los tableros predeterminados
      const defaultBoards = ['To-do', 'Doing', 'Done'];

      for (const boardName of defaultBoards) {
        await Board.create({
          name: boardName,
          owner_id: req.tempUser.id,
        });
      }

      console.log(`Tableros predeterminados creados para el usuario temporal con ID: ${req.tempUser.id}`);
    }

    // Continuar al siguiente middleware o ruta
    next();
  } catch (err) {
    console.error('Error al crear tableros predeterminados:', err);
    res.status(500).json({ error: 'Error al crear tableros predeterminados' });
  }
};

module.exports = createDefaultBoards;