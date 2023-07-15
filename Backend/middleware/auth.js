const jwt = require('jsonwebtoken');

const secret = 'Admin';

const authenticateJwt = (req,res,next) => {
    const autoHeader = req.headers.authorization;
    if(autoHeader) {
        const token = autoHeader.split(' ')[1];
        jwt.verify(token , secret , (err,data) => {
        if(err) return res.status(403).json({message: 'Unauthorized'});
        req.data = data;
        next();
        });
    }
    else res.status(401).json({message:'Missing Auth Header'});
};

const isAdmin = (req,res,next) => {
    if(!(req.data.role === 'Admin')) {
        return res.status(404).json({message: 'Admins Only Allowed'});
    }
    next();
}

module.exports = {
    authenticateJwt ,
    isAdmin,
    secret
}