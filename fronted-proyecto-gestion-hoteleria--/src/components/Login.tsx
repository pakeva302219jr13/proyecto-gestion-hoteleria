// src/components/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/auth/login', formData);
      setMessage('Inicio de sesión exitoso');
      setToken(response.data.token);

      // Guarda el token en el local storage o en un contexto para uso futuro
      localStorage.setItem('token', response.data.token);
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error en la conexión');
      }
    }
  };

  return (
    <div>
      <h2>Inicio de Sesión</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {token && <p>Token: {token}</p>}
    </div>
  );
};

export default Login;
