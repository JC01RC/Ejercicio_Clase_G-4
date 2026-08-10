const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", (req, res) => {
    res.send("API funcionando correctamente.");
});

const PORT = 3000;

app.use(express.json());

const archivoLibros = "./books.json";

function obtenerLibros() {
    const datos = fs.readFileSync(archivoLibros, "utf-8");
    return JSON.parse(datos);
}

function guardarLibros(libros) {
    fs.writeFileSync(
        archivoLibros,
        JSON.stringify(libros, null, 2)
    );
}

app.get("/", (req, res) => {
    res.send("API de libros funcionando correctamente.");
});

app.get("/api/books", (req, res) => {

    const libros = obtenerLibros();

    res.json(libros);
});

app.get("/api/books/:id", (req, res) => {

    const libros = obtenerLibros();

    const idLibro = parseInt(req.params.id);

    const libroEncontrado = libros.find(
        libro => libro.id === idLibro
    );

    if (!libroEncontrado) {
        return res.status(404).json({
            mensaje: "Libro no encontrado"
        });
    }

    res.json(libroEncontrado);
});

app.post("/api/books", (req, res) => {

    const libros = obtenerLibros();

    const nuevoLibro = {
        id: libros.length > 0
            ? Math.max(...libros.map(libro => libro.id)) + 1
            : 1,

        titulo: req.body.titulo,
        autor: req.body.autor,
        genero: req.body.genero,
        anioPublicacion: req.body.anioPublicacion
    };

    libros.push(nuevoLibro);

    guardarLibros(libros);

    res.status(201).json({
        mensaje: "Libro agregado correctamente",
        libro: nuevoLibro
    });
});

app.put("/api/books/:id", (req, res) => {

    const libros = obtenerLibros();

    const idLibro = parseInt(req.params.id);

    const indiceLibro = libros.findIndex(
        libro => libro.id === idLibro
    );

    if (indiceLibro === -1) {
        return res.status(404).json({
            mensaje: "Libro no encontrado"
        });
    }

    const libroActualizado = {
        id: idLibro,
        titulo: req.body.titulo,
        autor: req.body.autor,
        genero: req.body.genero,
        anioPublicacion: req.body.anioPublicacion
    };

    libros[indiceLibro] = libroActualizado;

    guardarLibros(libros);

    res.json({
        mensaje: "Libro actualizado correctamente",
        libro: libroActualizado
    });
});

app.delete("/api/books/:id", (req, res) => {

    const libros = obtenerLibros();

    const idLibro = parseInt(req.params.id);

    const libroEncontrado = libros.find(
        libro => libro.id === idLibro
    );

    if (!libroEncontrado) {
        return res.status(404).json({
            mensaje: "Libro no encontrado"
        });
    }

    const librosActualizados = libros.filter(
        libro => libro.id !== idLibro
    );

    guardarLibros(librosActualizados);

    res.json({
        mensaje: "Libro eliminado correctamente",
        libro: libroEncontrado
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});




