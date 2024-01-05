const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = async (req, res, next) => {
  try {
    // recoger el jwtToken de la cabecera o del body o de la query string
    const jwtToken = req.get("Authorization") || req.body.jwt || req.query.jwt;
    // Comprobar que me han mandado un jwtToken
    if (!jwtToken) {
      next(createError(401, "No token provided"));
      return;
    }
    // comprobaremos tambien que el token es valido
    const payload = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET,
      (err, payload) => {
        if (err) {
          next(createError(401, "invalid token"));
          return;
        }
        // dejamos pasar al siguiente middleware
        next();
      }
    );
  } catch (error) {
    next(error);
  }
};
