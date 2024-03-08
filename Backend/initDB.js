"use strict";

const readline = require("readline");
const connection = require("./lib/connectMongoose");
const Anuncio = require("./models/anunciosModel");
const initData = require("./initDBData.json");

main().catch((err) => console.log("Hubo un error", err));

async function main() {
  await new Promise((resolve) => connection.once("open", resolve));
  const borrar = await pregunta(
    "Are you sure you want to drop the database and load initial data: "
  );
  if (!borrar) process.exit();
  await initAnuncios();
  connection.close();
}

async function initAnuncios() {
  const deleted = await Anuncio.deleteMany();
  console.log(`Deleted ${deleted.length} anuncios.`);
  const inserted = await Anuncio.insertMany(initData.anuncios);
  console.log(`Creados ${inserted.length} anuncios.`);
}

function pregunta(texto) {
  return new Promise((resolve, reject) => {
    // conectar readline con la consola
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    ifc.question(texto, (respuesta) => {
      ifc.close();
      if (respuesta.toLowerCase() === "si") {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}
