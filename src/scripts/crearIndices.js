const mongoose = require("mongoose");
const Alumno = require("../models/alumno");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);
//los indices para el API se crearon por separado, por que 
//cada que inicia la API se crearan repetidamente, lo que no se 
//veria muy necesario y afectaria el rendimiento

//Función para crear índices
const crearIndices = async () => {
  try {
    //indice simple en el campo "carrera"
    await Alumno.collection.createIndex({ carrera: 1 });

    //indice compuesto en los campos "carrera (ascendente)" y "promedio (descendente)"
    await Alumno.collection.createIndex({ carrera: 1, promedio: -1 });

    //indice simple en el campo "fecha_creacion"
    await Alumno.collection.createIndex({ fecha_creacion: 1 });

    console.log("⚡ Índices creados correctamente.");
  } catch (error) {
    console.error("✖️ Error al crear índices:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

crearIndices();