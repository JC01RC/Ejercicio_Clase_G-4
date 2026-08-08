const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("API funcionando correctamente.");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});