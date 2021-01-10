var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.get('/', (req, res) => {
    let data = req.body;
    console.log(data);
    res.send('game');
});

module.exports = router;