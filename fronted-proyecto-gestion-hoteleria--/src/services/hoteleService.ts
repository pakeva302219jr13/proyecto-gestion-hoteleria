import axios from 'axios';

const API_URL = 'http://localhost:4000/api/hoteles';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); 
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

// Crear un nuevo hotel
export const createHotel = async (hotelData: {
  nombre: string;
  direccion: string;
  clasificacion: number;
  hora_entrada: string;
  hora_salida: string;
  ubicacion: string;
  numeroHabitaciones: number;
  servicios?: string;
  precio_por_noche: number;
}) => {
  try {
    const response = await axios.post(API_URL, hotelData, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    console.error('Error al crear el hotel:', error.response?.data || error.message);
    throw new Error('Error al crear el hotel');
  }
};

// Obtener la lista de hoteles
export const getHoteles = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data; // Ajustado para acceder al arreglo de hoteles
  } catch (error: any) {
    console.error('Error al obtener hoteles:', error.response?.data || error.message);
    throw new Error('Error al obtener la lista de hoteles');
  }
};

// Obtener detalles de un hotel específico
export const getHotelDetails = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data; // Ajustado para obtener solo el objeto hotel
  } catch (error: any) {
    console.error(`Error al obtener los detalles del hotel con id ${id}:`, error.response?.data || error.message);
    throw new Error(`Error al obtener los detalles del hotel con id ${id}`);
  }
};

// Actualizar un hotel
export const updateHotel = async (id: string, hotelData: {
  nombre?: string;
  direccion?: string;
  clasificacion?: number;
  hora_entrada?: string;
  hora_salida?: string;
  ubicacion?: string;
  numeroHabitaciones?: number;
  servicios?: string;
  precio_por_noche?: number;
}) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, hotelData, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    console.error(`Error al actualizar el hotel con id ${id}:`, error.response?.data || error.message);
    throw new Error(`Error al actualizar el hotel con id ${id}`);
  }
};

// Eliminar un hotel
export const deleteHotel = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
  } catch (error: any) {
    console.error(`Error al eliminar el hotel con id ${id}:`, error.response?.data || error.message);
    throw new Error(`Error al eliminar el hotel con id ${id}`);
  }
};
