const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

let books = [
    {
        id: 1,
        titulo: "Clean Code",
        autor: "Robert Martin",
        genero: "Programacion",
        anioPublicacion: 2008
    },
    {
        id: 2,
        titulo: "JavaScript",
        autor: "Juan Perez",
        genero: "Tecnologia",
        anioPublicacion: 2020
    }
];

// GET TODOS LOS LIBROS---------------------------------------------
app.get('/api/books', (req, res) => {
    res.status(200).json({
        status: 200,
        message: "Success",
        data: books
    });
});

// GET LIBRO POR ID---------------------------------------------
app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let isActive = false;

    books.forEach(book => {
        if (book.id === id) {
            isActive = true;
            return res.status(200).json({
                status: 200,
                message: "Success",
                data: book
            });
        }
    });

    if (!isActive) {
        return res.status(404).json({
            status: 404,
            message: "Registro no encontrado",
            data: null
        });
    }
});

// POST LIBRO-------------------------------------------------
app.post('/api/books', (req, res) => {
    const body = req.body;

    books.push(body);

    res.status(201).json({
        status: 201,
        message: "Libro agregado exitosamente",
        data: body
    });
});

// PUT LIBRO-------------------------------------------------
app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let isActive = false;

    books.forEach(book => {
        if (book.id === id) {
            book.titulo = req.body.titulo;
            book.autor = req.body.autor;
            book.genero = req.body.genero;
            book.anioPublicacion = req.body.anioPublicacion;

            isActive = true;

            return res.status(200).json({
                status: 200,
                message: "Libro actualizado exitosamente",
                data: book
            });
        }
    });

    if (!isActive) {
        return res.status(404).json({
            status: 404,
            message: "Registro no encontrado",
            data: null
        });
    }
});

// DELETE LIBRO POR ID---------------------------------------------
app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let isActive = false;

    books.forEach((book, index) => {
        if (book.id === id) {
            isActive = true;
            books.splice(index, 1);

            return res.status(200).json({
                status: 200,
                message: "Libro eliminado exitosamente",
                data: book
            });
        }
    });

    if (!isActive) {
        return res.status(404).json({
            status: 404,
            message: "Registro no encontrado",
            data: null
        });
    }
});

// INICIAR EL SERVIDOR---------------------------------------------
app.listen(PORT, () => {
    console.log(`El servidor esta escuchando en http://localhost:${PORT}`);
});