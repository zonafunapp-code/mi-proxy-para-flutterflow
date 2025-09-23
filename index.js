const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

// URL de tu Google Apps Script
const api_url = 'https://script.google.com/macros/s/AKfycbwsbH9SpKMBdXMkMwgxMl-zwWa2NvrtJq50BKiJpiSJiLv8r4i6d9vxKV2JvdSK1MFt/exec';

// Ruta de prueba
app.get('/', (req, res) => {
  res.status(200).json({ message: "✅ Proxy funcionando. Usa POST /api con { action, sheet, data }" });
});

// Nueva ruta que reenvía cualquier acción (CRUD)
app.post('/api', async (req, res) => {
  try {
    const payload = req.body; // { action, sheet, data }

    const response = await axios.post(api_url, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error al procesar la solicitud:', error.message);
    res.status(500).json({ status: "error", message: "Error al comunicar con Apps Script" });
  }
});

// Puerto para Render
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor proxy escuchando en el puerto ${port}`);
});

module.exports = app;
