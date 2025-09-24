const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

// =========================
// URL de tu Google Apps Script (nuevo link)
// =========================
const api_url = 'https://script.google.com/macros/s/AKfycbwP3pi9nRNES1vdPRurZ7rcorKtqxmy7lUS1yF4ZGdwDdStKfIk-DR9y7vv3V49aoqhGA/exec';

// =========================
// Ruta de prueba
// =========================
app.get('/', (req, res) => {
  res.status(200).json({ message: "✅ Proxy funcionando. Usa POST /api con { action, sheet, data }" });
});

// =========================
// Endpoint principal /api para CRUD
// =========================
app.post('/api', async (req, res) => {
  try {
    const payload = req.body; // { action, sheet, data }

    // Llamada a Apps Script
    const response = await axios.post(api_url, payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error al procesar la solicitud:', error.message);
    res.status(500).json({ status: "error", message: "Error al comunicar con Apps Script" });
  }
});

// =========================
// Puerto para Render
// =========================
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor proxy escuchando en el puerto ${port}`);
});

module.exports = app;
