const express = require('express');
const app = express();
app.use(express.json());

// Datos
let datosP = [];

app.all('/Datos/All', (req,res)=>{
    if (req.method === 'GET') {
        
        const idp = parseInt(req.query.idpersona);
        if (idp) {
            const persona = datosP.find((p) => p.id === idp);
            if (!persona) {
                return res.status(404).json({ error: "Persona no encontrada" });
            }
            return res.json(persona);
        } else {
            return res.json(datosP);
        }
    }else if (req.method === 'DELETE'){
        const idp = parseInt(req.query.idpersona);

        if (!idp) {
            return res.status(400).json({ error: "Debe proporcionar un idpersona" });
        }

        const index = datosP.findIndex((p) => p.id === idp);

        if (index === -1) {
            return res.status(404).json({ error: "Persona no encontrada" });
        }

        datosP.splice(index, 1);
        res.json(datosP);
    }

    res.status(405).json({
        message: `Método ${req.method} no está implementado para esta ruta.`,
    });
})

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Framework ejecutándose con éxito');
});
