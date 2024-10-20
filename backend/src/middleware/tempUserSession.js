const { TempUser } = require('../models');
const { v4: uuidv4 } = require('uuid');

// Middleware para gestionar sesiones de usuarios temporales
const tempUserSession = async (req, res, next) => {
  try {
    // Verifica si existe un usuario temporal en la sesión
    if (!req.session.tempUserSessionId) {
      // Generar un session_id único
      const sessionId = uuidv4();

      // Crear un nuevo registro en la tabla temp_users
      const tempUser = await TempUser.create({
        session_id: sessionId, // Asignar el session_id único
      });

      // Guardar el session_id del usuario temporal en la sesión
      req.session.tempUserSessionId = tempUser.session_id;
      console.log(`Usuario temporal creado con session_id: ${tempUser.session_id}`);
    } else {
      console.log(`Usuario temporal ya existente con session_id: ${req.session.tempUserSessionId}`);
    }

    // Continuar al siguiente middleware o ruta
    next();
  } catch (err) {
    console.error('Error al gestionar la sesión de usuario temporal:', err);
    res.status(500).json({ error: 'Error al gestionar la sesión de usuario temporal' });
  }
};

module.exports = tempUserSession;