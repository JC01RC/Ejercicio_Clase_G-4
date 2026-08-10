const express = require("express");
const fs = require("fs");

const app = express();

const PORT = 3000;

app.use(express.json());

const archivoLibros = "./books.json";

function obtenerLibros() {
    const datos = fs.readFileSync(archivoLibros, "utf-8");
    return JSON.parse(datos);
}

app.get("/", (req, res) => {
    res.send("API de libros funcionando correctamente.");
});

app.get("/api/books", (req, res) => {
    const libros = obtenerLibros();

    res.json(libros);
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});