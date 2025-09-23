const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Asegúrate de que esta URL sea la de tu Google Apps Script
const api_url = 'https://script.google.com/macros/s/AKfycbwsbH9SpKMBdXMkMwgxMl-zwWa2NvrtJq50BKiJpiSJiLv8r4i6d9vxKV2JvdSK1MFt/exec';

// Ruta por defecto para la URL principal.
app.get('/', (req, res) => {
    res.status(200).json({ message: "Proxy is working! Add a sheet name to the URL, e.g., /productos" });
});

// Este es el endpoint dinámico para todas las hojas
app.get('/:sheet', async (req, res) => {
    try {
        // Lee el nombre de la hoja de la URL
        const sheetName = req.params.sheet;
        
        // Define los parámetros para la petición GET
        const params = {
            action: "read",
            sheet: sheetName
        };

        // Hacemos una petición GET a tu API de Google Apps Script
        const response = await axios.get(api_url, { params: params });
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
        res.status(500).send('Error al obtener los datos de la API');
    }
});

// Cambiamos el puerto para que funcione en Render
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor proxy escuchando en el puerto ${port}`);
});

module.exports = app;
