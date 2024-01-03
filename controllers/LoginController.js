const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

class LoginController {
  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;

      const usuario = await Usuario.findOne({ email: email });

      if (!usuario || (await usuario.comparePassword(password))) {
        res.json({ error: "Invalid credentials" });
        return;
      }

      //Si las credenciales son correctas
      const tokenJWT = await jwt.sign(
        { _id: usuario._id },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      res.json({ jwt: tokenJWT });
    } catch (error) {}
  }
}
