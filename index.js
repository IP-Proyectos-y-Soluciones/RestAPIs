const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors'); // Cors permite que un cliente se conecta a otro servidor para el intercambio de recursos



// Conectar a Mongo
// main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/restapis");
}
main()
  .then(() => {
    console.log("Conectado a la Base de Datos");
  })
  .catch((err) => {
    console.log("¡Error! No conectado a la Base de Datos", err);
  });

// Crear el Servidor
const app = express();

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar cors
app.use(cors());

// Rutas de la App
app.use("/", routes());

// carpeta publica
app.use(express.static('uploads'));

// Puerto
app.listen(5000);
