import React from 'react';

const productos = [
  { n: "ESFEROS", d: "GRABADO LÁSER DE ALTA PRECISIÓN.", p: "$3.500", icon: "bi-pen" },
  { n: "TERMOS", d: "ACERO INOXIDABLE Y DISEÑO 360°.", p: "$28.000", icon: "bi-droplet" },
  { n: "LLAVEROS", d: "DETALLES METÁLICOS DE LUJO.", p: "$1.500", icon: "bi-key" },
  { n: "CAMISETAS", d: "TEXTIL PREMIUM ALTA DEFINICIÓN.", p: "$15.000", icon: "bi-person" },
  { n: "BUSOS", d: "TELA SUAVE Y CORTE ELEGANTE.", p: "$45.000", icon: "bi-universal-access" },
  { n: "GORRAS", d: "BORDADO Y ESTILO MODERNO.", p: "$8.000", icon: "bi-emoji-smile" },
  { n: "POCILLOS", d: "CERÁMICA BRILLANTE CALIDAD AAA.", p: "$12.000", icon: "bi-cup-hot" },
  { n: "PENDONES", d: "IMPRESIÓN DE GRAN FORMATO.", p: "$35.000", icon: "bi-image" }
];

function SeccionProductos() {
  return (
    <div className="container py-5" id="productos">
      <div className="row g-4">
        {productos.map((p, i) => (
          <div className="col-md-3" key={i}>
            <div className="cat-card">
              <i className={`bi ${p.icon} text-gold fs-1`}></i>
              <h3 className="titulo-dorado mt-2">{p.n}</h3>
              <p className="texto-blanco mb-2">{p.d}</p>
              <p className="precio-dorado">{p.p}</p>
              <button className="btn btn-outline-light btn-sm w-100">COTIZAR</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeccionProductos;