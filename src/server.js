const express = require("express");
const conectarDB = require("./config/db");
const alumnoRoutes = require("./routes/alumnoRoutes");

const app = express();
const PORT = process.env.PORT || 5000;


conectarDB();

app.use(express.json());

app.use("/api/alumnos", alumnoRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});