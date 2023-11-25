const jwt = require('jsonwebtoken');
require('dotenv').config();

async function auth(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Adicione informações relevantes à requisição para uso posterior
    req.token = token;
    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    return res.sendStatus(403);
  }
}

module.exports = auth;
