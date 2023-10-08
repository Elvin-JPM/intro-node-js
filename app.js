const express = require("express");
const cors = require('cors');
const app = express();

require("./lib/connectMongoose");

// Middleware
app.use(cors());
app.use(express.json());

// RUTAS
app.use("/api/v1/anuncios", require("./routes/anuncios"));

// STARTING SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
