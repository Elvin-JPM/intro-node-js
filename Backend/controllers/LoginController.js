const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

class LoginController {
  // index(req, res, next) {
  //   res.locals.error = "";
  //   res.locals.email = "";
  //   // res.render("login");
  // }
  async postJWT(req, res, next) {
    try {
      console.log("Request body: ", req.body);
      const { email, password } = req.body;

      const usuario = await Usuario.findOne({ email: email });
      console.log(usuario);

      if (!usuario || (await usuario.comparePassword(password))) {
        res.json({ error: "Invalid credentials" });
        return;
      }

      console.log("JWT_SECRET:", "lkalsADS223426sll!-D");
      //Si las credenciales son correctas
      const tokenJWT = jwt.sign({ _id: usuario._id }, "lkalsADS223426sll!-D", {
        expiresIn: "2h",
      });

      // req.session.usuarioLogado = usuario._id;

      res.json({ jwt: tokenJWT });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LoginController;
