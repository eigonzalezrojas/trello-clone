const { TempUser } = require('../models');

// Función para crear un usuario temporal si no existe
const createTempUser = async (req, res, next) => {
    let sessionId = req.sessionID;

    // Verificar si el usuario temporal ya existe en la sesión
    let user = await TempUser.findOne({ where: { session_id: sessionId } });

    if (!user) {        
        user = await TempUser.create({ session_id: sessionId });
    }

    req.tempUserId = user.id;
    next();
};