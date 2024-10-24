const { TempUser } = require('../models');

const tempUserSession = async (req, res, next) => {
  try {
    if (!req.session.tempUserId) {
      const tempUser = await TempUser.create({ session_id: req.sessionID });
      req.session.tempUserId = tempUser.id;
      req.tempUser = tempUser;
    } else {
      const tempUser = await TempUser.findByPk(req.session.tempUserId);
      if (tempUser) {
        req.tempUser = tempUser;
      } else {
        const newTempUser = await TempUser.create({ session_id: req.sessionID });
        req.session.tempUserId = newTempUser.id;
        req.tempUser = newTempUser;
      }
    }
    next();
  } catch (error) {
    console.error('Error in tempUserSession middleware:', error);
    res.status(500).json({ error: 'Error en la creación de usuario temporal' });
  }
};

module.exports = tempUserSession;