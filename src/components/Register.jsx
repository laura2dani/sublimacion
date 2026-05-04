import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Register from './components/Register'; // Importamos tu archivo externo
import './App.css';

// --- SECCIÓN INICIO ---
const Inicio = () => (
  <div className="section-container fade-in">
    <h1 className="gold-text title-medium">Sublimación 5C</h1>
    <p className="subtitle-medium">Personalización premium con acabados de lujo.</p>
    <div className="info-grid">
      <div className="info-card">
        <h2 className="gold-text">Misión</h2>
        <p className="info-text">Creamos piezas únicas que cuentan tu historia con la mejor calidad del mercado y un diseño excepcional, garantizando durabilidad y elegancia en cada detalle.</p>
      </div>
      <div className="info-card">
        <h2 className="gold-text">Visión</h2>
        <p className="info-text">Ser el referente número uno en diseño exclusivo y sublimación para el año 2028, liderando el mercado con innovación y distinción.</p>
      </div>
    </div>
  </div>
);

// --- SECCIÓN INGRESAR ---
const Ingresar = () => (
  <div className="section-container fade-in">
    <div className="auth-card">
      <h2 className="gold-text title-medium">Bienvenido</h2>
      <p className="info-text">Ingresa tus credenciales para continuar.</p>
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
        <input type="email" placeholder="Correo electrónico" required />
        <input type="password" placeholder="Contraseña" required />
        <button className="gold-button-small">Iniciar Sesión</button>
      </form>
    </div>
  </div>
);

// --- SECCIÓN PRODUCTOS ---
const Productos = ({ agregarAlCarrito }) => {
  const lista = [
    { id: 1, n: 'Mugs', p: 15000, img: '/mugs.png' },
    { id: 2, n: 'Termos', p: 35000, img: '/termos.png' },
    { id: 3, n: 'Llaveros', p: 5000, img: '/llaveros.png' },
    { id: 4, n: 'Esferos', p: 3500, img: '/esferos.png' },
    { id: 5, n: 'Camisetas', p: 25000, img: '/camisetas.png' },
    { id: 6, n: 'Busos', p: 55000, img: '/busos.png' },
    { id: 7, n: 'Sombrillas', p: 30000, img: '/sombrillas.png' },
    { id: 8, n: 'Cuadros', p: 40000, img: '/cuadros.png' },
    { id: 9, n: 'Gorras', p: 18000, img: '/gorras.png' },
    { id: 10, n: 'Agendas', p: 22000, img: '/agendas.png' }
  ];

  return (
    <div className="product-grid">
      {lista.map((item) => (
        <div key={item.id} className="product-card">
          <div className="img-wrapper">
            <img src={item.img} alt={item.n} />
          </div>
          <h3 className="gold-text product-title">{item.n}</h3>
          <p className="price">${item.p.toLocaleString()}</p>
          <button className="gold-button-small" onClick={() => agregarAlCarrito(item)}>Agregar</button>
        </div>
      ))}
    </div>
  );
};

// --- COMPONENTE PRINCIPAL APP ---
function App() {
  const [seccion, setSeccion] = useState('inicio');
  const [carrito, setCarrito] = useState([]);
  const [abierto, setAbierto] = useState(false);

  const agregarAlCarrito = (p) => { 
    setCarrito([...carrito, p]); 
    setAbierto(true); 
  };
  
  const total = carrito.reduce((s, i) => s + i.p, 0);

  // FUNCIÓN PARA ENVIAR A MONGODB Y WHATSAPP
  const enviarWhatsApp = async () => {
    if (carrito.length === 0) return alert("El carrito está vacío");

    // 1. Guardar en Base de Datos (Backend)
    try {
      await fetch('http://localhost:5000/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreCliente: "Cliente Web",
          producto: carrito.map(i => i.n).join(", "),
          cantidad: carrito.length
        })
      });
      console.log("✅ Pedido respaldado en MongoDB Atlas");
    } catch (error) {
      console.error("❌ Error al conectar con el servidor:", error);
    }

    // 2. Abrir WhatsApp
    const tel = "573106404219";
    const msg = `Hola Sublimación 5C! Quisiera pedir: ${carrito.map(i => i.n).join(", ")}. Total: $${total.toLocaleString()}`;
    window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="app-container">
      <Navbar setSeccion={setSeccion} total={carrito.length} abrir={() => setAbierto(true)} />
      
      <header className="brand-header">
        <img src="/logo5c.png" alt="Logo" className="main-logo" onClick={() => setSeccion('inicio')} />
      </header>

      <main className="main-content">
        {seccion === 'inicio' && <Inicio />}
        {seccion === 'productos' && <Productos agregarAlCarrito={agregarAlCarrito} />}
        {seccion === 'registro' && <Register />} {/* Usamos el componente externo */}
        {seccion === 'ingresar' && <Ingresar />}
        {seccion === 'contacto' && (
          <div className="section-container fade-in">
            <h2 className="gold-text title-medium">Contáctenos</h2>
            <div className="contact-card">
              <p className="contact-data">📍 Carrera 13 No. 19 - 61 Centro</p>
              <p className="contact-data">📞 310 640 42 19</p>
              <p className="contact-data">✉️ sublimacion5c@gmail.com</p>
            </div>
          </div>
        )}
      </main>

      {/* SIDEBAR DEL CARRITO */}
      {abierto && (
        <div className="sidebar">
          <button className="close-btn" onClick={() => setAbierto(false)}>Cerrar X</button>
          <h2 className="gold-text">Mi Carrito</h2>
          <div className="cart-list">
            {carrito.map((item, index) => (
              <div key={index} className="cart-item">
                <span>{item.n}</span>
                <span className="gold-text">${item.p.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <h3 className="total-display">Total: ${total.toLocaleString()}</h3>
            <button className="ws-btn" onClick={enviarWhatsApp}>Pedir por WhatsApp</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;