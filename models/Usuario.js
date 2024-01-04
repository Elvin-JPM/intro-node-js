const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

// Metodo estatico que hace un hash de una password
usuarioSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 7);
};

// método de instancia que comprueba la password de un usuario
usuarioSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
