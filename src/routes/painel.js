var express = require('express');
var router = express.Router();
var User = require('../database/models/user')

router.use((req, res, next) => {
    console.log(`${new Date(Date.now()).toISOString()} :: Requesting Painel :: Ip: ${req.ip}`);
    next();
});

router.get('/getUsers', async (req, res) => {
    try {
        let allUsers = await User.find({});
        console.log('Consulta de Usuarios')
        return res.send(allUsers);
    } catch (error) {
        return res.status(400).send({ "error": 'Query Failed' })
    }
});

module.exports = router;