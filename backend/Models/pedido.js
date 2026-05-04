const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
	nombreCliente: { type: String, required: true },
	producto: { type: String, required: true },
	cantidad: { type: Number, required: true },
	fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
