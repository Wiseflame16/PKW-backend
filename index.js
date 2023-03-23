const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.use(express.json())
app.use("/api", require("./routes"))
app.listen(PORT, ()=> console.log(`Servidor corriendo en el puerto ${PORT}`))