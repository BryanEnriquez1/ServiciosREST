const express = require('express');
const app = express();
app.use(express.json());

// Datos
let datosP = [];

app.all('/Datos/All', (req,res)=>{
    
})

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Framework ejecutándose con éxito');
});
