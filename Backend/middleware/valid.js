const validator = require('validator');

const validateCredentials = (req, res, next) => {
    const { email, password } = req.body;
  
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
  
    const passwordSchema = new validator.isStrongPassword(password , {
        minLength: 8,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 1,
    });
    if (!passwordSchema) {
      return res.status(400).json({ error: 'Invalid password format' });
    }
  
    next();
};

module.exports = {validateCredentials};