const express = require('express');
const mongoose = require('./database');
const cors = require('cors');

const app = express();
const port = 8888;

app.use(cors());

app.use(express.json());

const auth = require('./routes/auth');
app.use('/auth', auth);

const game = require('./routes/game');
app.use('/game', game);

const painel = require('./routes/painel');
app.use('/painel', painel);

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.listen(port, () => {
    console.log(`TrucoKingss API listening at http://localhost:${port}`);
});
