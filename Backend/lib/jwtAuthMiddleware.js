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
    const payload = jwt.verify(jwtToken, "laskh2lsalSadlk", (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          next(createError(401, "Token has expired."));
        } else {
          next(createError(401, "invalid token"));
        }
        return;
      }

      // Check if the token is still valid based on expiration time
      const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
      if (payload.exp && payload.exp < currentTimestamp) {
        next(createError(401, "Token has expired"));
        return;
      }
      // apuntamos el usuario logado en la request
      req.usuarioLogadoAPI = payload._id;
      // dejamos pasar al siguiente middleware
      next();
    });
  } catch (error) {
    next(error);
  }
};
