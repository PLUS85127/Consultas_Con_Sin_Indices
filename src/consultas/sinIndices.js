const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Alumno = require('../models/alumno');

require('dotenv').config();

// Conectar a la base de datos
connectDB();

// PRIMERA CONSULTA: Filtro y ordenamiento
const consulta1 = async () => {
    const resultado = await Alumno.find({ carrera: "Ingeniería", promedio: { $gte: 8 } })
        .sort({ promedio: -1 })
        .explain("executionStats");
    console.log("Consulta 1 (sin índices) con filtro y ordenamiento:", resultado.executionStats);
};

// SEGUNDA CONSULTA: Agregación para promedio máximo y mínimo
const consulta2 = async () => {
    const resultado = await Alumno.aggregate([
        { $match: { carrera: "Ingeniería" } },
        {
            $group: {
                _id: "$carrera",
                promedioMaximo: { $max: "$promedio" },
                promedioMinimo: { $min: "$promedio" },
            },
        },
    ]).explain("executionStats");
    console.log("Consulta 2 (sin índices) con agregación:", resultado.executionStats);
};

// TERCERA CONSULTA: Rango de fechas
const consulta3 = async () => {
    const fechaInicio = new Date("2025-01-01");
    const fechaFin = new Date("2025-12-31");

    const resultado = await Alumno.find({
        fecha_creacion: { $gte: fechaInicio, $lte: fechaFin },
    }).explain("executionStats");
    console.log("Consulta 3 (sin índices) por fecha:", resultado.executionStats);
};

// Ejecutar las consultas
const ejecutarConsultas = async () => {
    try {
        await consulta1();
        await consulta2();
        await consulta3();
    } catch (error) {
        console.error("Error ejecutando las consultas:", error.message);
    } finally {
        mongoose.connection.close();
    }
};

ejecutarConsultas();
