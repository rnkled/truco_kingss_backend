var jwt = require('jsonwebtoken');
require('dotenv').config();


function validationMiddleware(req, res, next) {
    console.log(`${new Date(Date.now()).toISOString()} :: Requesting AUTH :: Ip: ${req.ip}`);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ "Erro!": "Não Autenticado!" });
    }
    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).send({ "Erro!": "Erro de Token!" });
    }

    const [scheme, token] = parts;
    if (!(scheme === "Bearer")) {
        return res.status(401).send({ "Erro!": "Token mal Formatado" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) return res.status(401).send({ "Erro!": "Token Invalido!" });

        req.userId = decoded.id;
        return next();
    });
};

module.exports = validationMiddleware;