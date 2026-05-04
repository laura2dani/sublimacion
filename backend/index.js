const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { webcrypto } = require('crypto');

if (!globalThis.crypto && webcrypto) {
  globalThis.crypto = webcrypto;
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Usuario = require('./Models/Usuario');
const Pedido = require('./Models/pedido');

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

// --- API USUARIOS ---
app.post('/api/usuarios', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const usuario = await Usuario.create({ nombre, email, password });
    return res.status(201).json({ id: usuario._id, nombre: usuario.nombre, email: usuario.email });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: 'El correo ya está registrado' });
    }
    return res.status(500).json({ message: 'Error al crear usuario' });
  }
});

// --- API PEDIDOS ---
app.post('/api/pedidos', async (req, res) => {
  try {
    const { nombreCliente, producto, cantidad } = req.body;

    if (!nombreCliente || !producto || typeof cantidad !== 'number') {
      return res.status(400).json({ message: 'Datos de pedido inválidos' });
    }

    const pedido = await Pedido.create({ nombreCliente, producto, cantidad });
    return res.status(201).json({ id: pedido._id });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear pedido' });
  }
});

// --- ARRANCAR SERVIDOR ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
});