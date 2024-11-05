// src/services/reservationService.ts
import axios from 'axios';

const apiUrl = 'http://localhost:4000/api/reservas';

export const fetchReservations = async (token: string | null) => {
  const response = await axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createReservation = async (data: any, token: string | null) => {
  const response = await axios.post(apiUrl, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateReservation = async (id: string, data: any, token: string | null) => {
  const response = await axios.put(`${apiUrl}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteReservation = async (id: string, token: string | null) => {
  const response = await axios.delete(`${apiUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
