const express = require('express');
const router = express.Router();
const User = require('../database/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.use((req, res, next) => {
    console.log(`${new Date(Date.now()).toISOString()} :: Requesting AUTH :: Ip: ${req.ip}`);
    next();
});



router.post('/join', async (req, res) => {
    try {
        let { email } = req.body
        if (await User.findOne({ email })) {
            return res.send({ "Erro!": 'O Usuario já Existe!' })
        }
        let user = await User.create(req.body);
        console.log(`Usuario ${user.name} Cadastrado!`)
        let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 })
        return res.send({ "Sucesso!": "Conta Criada!", "token": token });
    } catch (error) {
        console.log(error)
        return res.send({ "Erro!": 'Houve uma Falha no Registro.' })
    }
});
router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.send({ "Erro!": 'Usuario não encontrado. Já fez seu cadastro?' })
        }
        if (!await bcrypt.compare(password, user.password)) {
            return res.send({ "Erro!": 'Senha Incorreta!' })
        }

        let token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: 86400 })
        return res.send({ "Sucesso!": "Login Executado", "token": token });
    } catch (error) {
        console.log(error)
        return res.send({ "Erro!": 'Houve uma Falha no Login.' })
    }
});

module.exports = router;