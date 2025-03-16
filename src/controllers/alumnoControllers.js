const Alumno = require("../models/alumno");

//traer todos los alumnos
const obtenerAlumnos = async (req, res) => {
  try {
    //al ser una consulta muy grande, solo se traeran 10 registros
    //con .limit() esto es solo para que no se traiga toda la base de datos
    const alumnos = await Alumno.find().limit(20);
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los alumnos" });
  }
};

//consulta 1
const consultaFiltroOrdenamiento = async (req, res) => {
  try {
    const resultado = await Alumno.find({ carrera: "Ingeniería", promedio: { $gt: 8 } })
      .sort({ promedio: -1 })
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta 1" });
  }
};

//Consulta 2
const consultaAgregacion = async (req, res) => {
  try {
    const resultado = await Alumno.aggregate([
      { $match: { carrera: "Ingeniería" } },
      {
        $group: {
          _id: "$carrera",
          totalAlumnos: { $sum: 1 },
          promedioMaximo: { $max: "$promedio" },
          promedioMinimo: { $min: "$promedio" },
        },
      },
    ])
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta 2" });
  }
};

//Consulta 3
const consultaFecha = async (req, res) => {
  try {
    const fechaInicio = new Date("2025-01-01");
    const fechaFin = new Date("2025-12-31");
    const resultado = await Alumno.find({
      fecha_creacion: { $gte: fechaInicio, $lte: fechaFin },
    })
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta 3" });
  }
};

module.exports = {
  obtenerAlumnos,
  consultaFiltroOrdenamiento,
  consultaAgregacion,
  consultaFecha,
};