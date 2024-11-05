import React from 'react';
import { Link } from 'react-router-dom';
import hotelimagen from '../assets/hotelimagen.webp';

const Home = () => {
  return (
    <div className="container">
      <header>
        <h1>Gestión de Hotelerias JR</h1>
        <nav>
          <Link to="/login">Iniciar Sesión</Link>
          <Link to="/register">Registrarse</Link>
          <Link to="/hotels">Ver Hoteles</Link>
        </nav>
      </header>
      <main>
        <h2>Bienvenido a Gestión de Hotelerias JR</h2>
        <p>Descubre los mejores hoteles y reserva fácilmente.</p>
        <div className="hotel-link-container">
          <img src={hotelimagen} alt="Hoteles" className="hotel-icon" />
          <Link to="/hotels" className="hotel-link">Ver Hoteles</Link>
        </div>
      </main>
      <footer className="footer">
        © 2024 Gestión Hotelera JR. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Home;
