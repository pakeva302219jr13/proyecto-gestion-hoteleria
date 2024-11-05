// src/services/userService.ts
import axios from 'axios';

const API_URL = 'http://localhost:4000/auth';

interface UserData {
  email: string;
  password: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  address?: string;
}

// Registro de usuario
export const registerUser = async (userData: UserData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error: any) {
    console.error('Error al registrar usuario:', error.message);
    throw new Error(error.response?.data?.message || 'Error al registrar usuario');
  }
};

// Inicio de sesión
export const loginUser = async (userData: UserData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error: any) {
    console.error('Error al iniciar sesión:', error.message);
    throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
  }
};
