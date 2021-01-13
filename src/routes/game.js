var express = require('express');
var validationMiddleware = require('../services/validationMiddleware');
var router = express.Router();
const User = require('../database/models/user');

router.use(validationMiddleware);

router.get('/', async (req, res) => {
    let data = req.body;
    res.send(await User.findById(req.userId));
});

module.exports = router;