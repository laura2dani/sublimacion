import React from 'react';

const Navbar = ({ setSeccion, total, abrir }) => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li onClick={() => setSeccion('inicio')}>Inicio</li>
        <li onClick={() => setSeccion('productos')}>Productos</li>
        <li onClick={() => setSeccion('registro')}>Registro</li>
        <li onClick={() => setSeccion('ingresar')}>Ingresar</li>
        <li onClick={() => setSeccion('contacto')}>Contacto</li>
        <li onClick={abrir} className="cart-nav-btn">🛒 ({total})</li>
      </ul>
    </nav>
  );
};

export default Navbar;