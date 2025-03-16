const mongoose = require("mongoose");
const Alumno = require("../models/alumno");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

// Crear índices
const crearIndices = async () => {
  try {
    // Índice en el campo "carrera"
    //es indice simple
    await Alumno.collection.createIndex({ carrera: 1 });

    // Índice en los campos "carrera" y "promedio" (por que mi indice 2 lo requiere)
    //es indice compuesto
    await Alumno.collection.createIndex({ carrera: 1, promedio: -1 });

    // Índice en el campo "fecha_creacion"
    //indice simple
    await Alumno.collection.createIndex({ fecha_creacion: 1 });

    console.log("⚡Índices creados correctamente.");
  } catch (error) {
    console.error("✖️ Error al crear índices:", error.message);
  }
};


const ejecutarConsultas = async () => {
  await crearIndices();
 //consulta 1
  const consulta1 = await Alumno.find({ carrera: "Ingeniería", promedio: { $gt: 8 } })
    .sort({ promedio: -1 })
    .explain("executionStats");
  console.log("Consulta 1 (con índices) con filtro y ordenamiento::", consulta1.executionStats);

  //consulta 2
  const consulta2 = await Alumno.aggregate([
    { $match: { carrera: "Ingeniería" } },
    {
      $group: {
        _id: "$carrera",
        totalAlumnos: { $sum: 1 },
        promedioMaximo: { $max: "$promedio" },
        promedioMinimo: { $min: "$promedio" },
      },
    },
  ]).explain("executionStats");
  console.log("Consulta 2 (con índices) con agregación:", consulta2.executionStats);

  //Consulta 3
  const fechaInicio = new Date("2025-01-01");
  const fechaFin = new Date("2025-12-31");
  const consulta3 = await Alumno.find({
    fecha_creacion: { $gte: fechaInicio, $lte: fechaFin },
  }).explain("executionStats");
  console.log("Consulta 3 (con índices) por fecha:", consulta3.executionStats);

  mongoose.connection.close();
};

ejecutarConsultas();
