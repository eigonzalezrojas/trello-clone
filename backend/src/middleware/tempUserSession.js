const { TempUser } = require('../models');

const tempUserSession = async (req, res, next) => {
  try {
    if (!req.session.tempUserId) {
      // Crear un nuevo usuario temporal si no existe en la sesión
      const tempUser = await TempUser.create({ session_id: req.sessionID });
      req.session.tempUserId = tempUser.id;
      req.tempUser = tempUser;
      console.log(`Nuevo usuario temporal creado con ID: ${tempUser.id}`);
    } else {
      // Recuperar el usuario temporal existente usando el ID de la sesión
      const tempUser = await TempUser.findByPk(req.session.tempUserId);
      if (tempUser) {
        req.tempUser = tempUser;
        console.log(`Usuario temporal existente con ID: ${tempUser.id}`);
      } else {
        // Si no se encuentra, crear uno nuevo
        const newTempUser = await TempUser.create({ session_id: req.sessionID });
        req.session.tempUserId = newTempUser.id;
        req.tempUser = newTempUser;
        console.log(`Nuevo usuario temporal creado con ID: ${newTempUser.id}`);
      }
    }
    next();
  } catch (error) {
    console.error('Error en el middleware de sesión del usuario temporal:', error);
    res.status(500).json({ error: 'Error en la creación de usuario temporal' });
  }
};

module.exports = tempUserSession;