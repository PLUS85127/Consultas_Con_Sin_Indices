const express = require("express");
const router = express.Router();
const alumnoController = require("../controllers/alumnoControllers");

//ruta solo para obtener alumnos
router.get("/", alumnoController.obtenerAlumnos);

//ruta para la consulta 1 sobre filtro y ordenamiento
router.get("/consulta1", alumnoController.consultaFiltroOrdenamiento);

//ruta para la consulta 2 sobre agregacion
router.get("/consulta2", alumnoController.consultaAgregacion);

//ruta para la consulta 3 que es de búsqueda por fecha
router.get("/consulta3", alumnoController.consultaFecha);

module.exports = router;