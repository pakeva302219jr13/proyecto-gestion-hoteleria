import axios from 'axios';

const API_URL = 'http://localhost:4000/auth';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: 'Error al iniciar sesión' };
  }
};

export const registerUser = async (nombre: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { nombre, email, password });
    return { success: true, message: 'Usuario registrado correctamente' };
  } catch (error) {
    return { success: false, message: 'Error al registrar el usuario' };
  }
};
