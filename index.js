const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Asegúrate de que esta URL sea la de tu Google Apps Script
const api_url = 'https://script.google.com/macros/s/AKfycbwsbH9SpKMBdXMkMwgxMl-zwWa2NvrtJq50BKiJpiSJiLv8r4i6d9vxKV2JvdSK1MFt/exec';

// Este es el único endpoint que usaremos para nuestra API
app.get('/', async (req, res) => {
    try {
        // Hacemos una petición POST y le enviamos la acción "read"
        const response = await axios.post(api_url, { action: "read" });
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener los productos:', error.message);
        res.status(500).send('Error al obtener los productos de la API');
    }
});

// Cambiamos el puerto para que funcione en Render
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor proxy escuchando en el puerto ${port}`);
});

module.exports = app;
