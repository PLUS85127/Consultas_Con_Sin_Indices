const mongoose = require('mongoose');
const Alumno = require('../models/alumno');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

//solo lo ejecutamos una vez para insertar los datos
const generarDatos = () => {
    const temp = [];
    fechaInicio = new Date("2025-01-01");
    fechaFin = new Date("2025-12-31");

    for (let i = 0; i < 50000; i++) {

      const fechaAleatoria = new Date(
        fechaInicio.getTime() + Math.random() * (fechaFin.getTime() - fechaInicio.getTime())
      );

      temp.push({
        name: `Alumno ${i}`,
        edad: Math.floor(Math.random() * 10) + 18, //Edad entre 18 y 27
        matricula: 10000 + i, //Matrícula única
        carrera: ["Ingeniería", "Nutrición", "Ciencias", "Teologia", "Contaduria"][Math.floor(Math.random() * 5)],
        promedio: (Math.random() * 10).toFixed(2), //Promedio entre 0 y 10
        fecha_creacion: fechaAleatoria
      });
    }
  
    return temp;
  };

  //insertar los datos
  const insertarDatos = async () => {
   try {
    const datos = generarDatos();
    await Alumno.insertMany(datos);
    console.log("50000 datos (alumnos) insertados con éxito");
   } catch (error) {
    console.error("Error al insertar datos:", error);
   } finally {
    mongoose.connection.close();
   }
  };

  insertarDatos();