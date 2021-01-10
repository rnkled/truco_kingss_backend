var express = require('express');
var router = express.Router();
var User = require('../database/models/user')

router.use((req, res, next) => {
    console.log(`${new Date(Date.now()).toISOString()} :: Requesting AUTH :: Ip: ${req.ip}`);
    next();
});
router.post('/join', async (req, res) => {
    try {
        let user = await User.create(req.body);
        console.log('Usuario Cadastrado!')
        return res.send(user);
    } catch (error) {
        return res.status(400).send({ "error": 'Registration Failed' })
    }
});
router.get('/login', (req, res) => {
    let data = req.body;
    console.log(data);
    res.send('Login');
});

module.exports = router;