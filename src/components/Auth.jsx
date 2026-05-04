import React from 'react';

function Auth() {
  return (
    <div className="container py-5" id="contactos">
      <div className="row g-5">
        <div className="col-md-6">
          <div className="cat-card">
            <h2 className="text-gold mb-4">ENTRAR</h2>
            <form className="w-100">
              <input type="email" className="form-control mb-3 bg-transparent text-white border-secondary" placeholder="EMAIL" />
              <input type="password" className="form-control mb-4 bg-transparent text-white border-secondary" placeholder="CONTRASEÑA" />
              <button className="btn-5c">ENTRAR</button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="cat-card">
            <h2 className="text-gold mb-4">CREAR CUENTA</h2>
            <form className="w-100">
              <input type="text" className="form-control mb-3 bg-transparent text-white border-secondary" placeholder="NOMBRE" />
              <input type="email" className="form-control mb-3 bg-transparent text-white border-secondary" placeholder="EMAIL" />
              <input type="password" className="form-control mb-4 bg-transparent text-white border-secondary" placeholder="CONTRASEÑA" />
              <button className="btn-5c">CREAR CUENTA</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Auth;