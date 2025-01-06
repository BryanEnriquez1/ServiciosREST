const express = require('express');
const app = express();
app.use(express.json());

// Datos
let datosP = [
    { id: 1, nombre: "Alexander", apellido: "Enriquez", description: "Estudiante de desarrollo de software" },
    { id: 2, nombre: "Paul", apellido: "Ormaza", description: "Estudiante de desarrollo de software" }
];

//GET all: Obtner todos los datos
app.get('/Datos', (req, res) => {
    res.json(datosP);
});

// GET (all): Obtener los datos de un elemento por ID
app.get('/Datos', (req, res) => {
    const idp = parseInt(req.query.idpersona);
    if (!idp) {
        return res.status(400).json({ error: "Debe proporcionar un idpersona" });
    }

    const persona = datosP.find((p) => p.id === idp);

    if (!persona) {
        return res.status(404).json({ error: "Persona no encontrada" });
    }

    res.json(persona);
});

// POST: Agregar un nuevo elemento
app.post('/Datos/Add', (req, res) => {
    const { nombre, apellido, description } = req.body;

    if (!nombre || !apellido || !description) {
        return res.status(400).json({ error: "Ingrese todos los datos" });
    }

    const newPerson = {
        id: datosP.length > 0 ? datosP[datosP.length - 1].id + 1 : 1,
        nombre,
        apellido,
        description
    };

    datosP.push(newPerson);
    res.status(201).json(newPerson);
});

// PUT: Actualizar un elemento existente// Ormaza
app.put('/Datos/update', (req, res) => {
    const { idpersona, nombre, apellido, description } = req.body;
    const idp = parseInt(idpersona);

    if (!idp) {
        return res.status(400).json({ error: "Debe proporcionar un idpersona" });
    }

    const persona = datosP.find((p) => p.id === idp);

    if (!persona) {
        return res.status(404).json({ error: "Persona no existente" });
    }

    if (nombre) persona.nombre = nombre;
    if (apellido) persona.apellido = apellido;
    if (description) persona.description = description;

    res.json(persona);
});

// DELETE: Eliminar un elemento existente //Ormaza 
app.delete('/Datos/Eliminar', (req, res) => {
    const idp = parseInt(req.query.idpersona);

    if (!idp) {
        return res.status(400).json({ error: "Debe proporcionar un idpersona" });
    }

    const index = datosP.findIndex((p) => p.id === idp);

    if (index === -1) {
        return res.status(404).json({ error: "Persona no encontrada" });
    }

    datosP.splice(index, 1);
    res.status(204).send(); // No Content
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Framework ejecutándose con éxito');
});
