const express = require("express");
const cors = require("cors");
const app = express();
const LoginController = require("./controllers/LoginController");
const jwtAuthMiddleware = require("./lib/jwtAuthMiddleware");

require("./lib/connectMongoose");
require("dotenv").config();

const loginController = new LoginController();
app.use(express.urlencoded({ extended: true }));
// Middleware
app.use(cors());
app.use(express.json());

// RUTAS
app.use("/api/v1/anuncios", jwtAuthMiddleware, require("./routes/anuncios"));
app.use("/api/v1/authenticate", require("./routes/login"));
// STARTING SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
