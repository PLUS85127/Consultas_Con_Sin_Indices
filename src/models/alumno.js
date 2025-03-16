const { Schema, model } = require('mongoose');

const alumnoSchema = new Schema({
    name: String,
    edad: Number,
    matricula: Number,
    carrera: String,
    promedio: Number,
    fecha_creacion: { type: Date, default: Date.now },
});

module.exports = model('Alumno', alumnoSchema);
