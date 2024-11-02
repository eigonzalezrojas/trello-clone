const { TempUser } = require('../models');

// Create temporally user
const createTempUser = async (req, res, next) => {
    let sessionId = req.sessionID;

    // Check user session
    let user = await TempUser.findOne({ where: { session_id: sessionId } });

    if (!user) {        
        user = await TempUser.create({ session_id: sessionId });
    }

    req.tempUserId = user.id;
    next();
};