const express = require('express');
const { authenticateJwt } = require('../middleware/auth');

const router = express.Router();

router.get('me' , authenticateJwt , (req,res) => {
    res.send({username: req.data.username});
});

router.get('profile' , authenticateJwt , (req,res) => {
    res.sendStatus(200);
})

module.exports = router;