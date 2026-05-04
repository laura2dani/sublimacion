require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- MIDDLEWARE ---
// Esto permite que tu frontend (puerto 5173) se comunique con el backend
app.use(cors());
// Esto permite que tu servidor entienda los datos JSON que envías desde el formulario
app.use(express.json());

// --- CONEXIÓN A MONGODB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ ¡CONEXIÓN EXITOSA A MONGODB ATLAS!');
  })
  .catch(err => {
    console.error('❌ ERROR DE CONEXIÓN:', err.message);
  });

// --- RUTA DE PRUEBA ---
app.get('/', (req, res) => {
  res.send('El servidor de Sublimación está funcionando 🚀');
});

// --- ARRANCAR SERVIDOR ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
});