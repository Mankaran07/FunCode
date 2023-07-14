const jwt = require('jsonwebtoken');

const secret = 'Admin';

const authenticateJwt = (req,res,next) => {
    const autoHeader = req.headers.authorization;
    if(autoHeader) {
        const token = autoHeader.split(' ')[1];
        jwt.verify(token , secret , (err,user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
        });
    }
    else res.sendStatus(401);
};

module.exports = {
    authenticateJwt ,
    secret
}