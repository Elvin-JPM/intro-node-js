const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/anuncios", { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Mongoose connection error:", error);
});

db.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.once("open", () => {
  console.log("Conectado a MongoDB en", mongoose.connection.name);
});

module.exports = db;
