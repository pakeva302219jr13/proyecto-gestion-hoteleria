// src/pages/Reservations.tsx
import React, { useEffect, useState } from 'react';
import { fetchReservations, updateReservation, deleteReservation } from '../services/reservationService';
import ReservationActions from '../components/ReservationActions';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  const fetchReservationsData = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await fetchReservations(token);
      setReservations(data);
    } catch (error) {
      console.error('Error al obtener reservas:', error);
    }
  };

  useEffect(() => {
    fetchReservationsData();
  }, []);

  const handleUpdate = async (reservationId: string) => {
    // Lógica para actualizar una reserva
    const token = localStorage.getItem('token');
    await updateReservation(reservationId, { /* data de actualización */ }, token);
    fetchReservationsData(); // Refresca la lista de reservas
  };

  const handleDelete = async (reservationId: string) => {
    const token = localStorage.getItem('token');
    await deleteReservation(reservationId, token);
    fetchReservationsData(); // Refresca la lista de reservas
  };

  return (
    <div>
      <h2>Mis Reservas</h2>
      <ul>
        {reservations.map((reservation: any) => (
          <li key={reservation.id}>
            Habitación: {reservation.habitacion_id} | Entrada: {reservation.fecha_entrada} | Salida: {reservation.fecha_salida} | Estado: {reservation.estado_reserva}
            <ReservationActions 
              reservationId={reservation.id} 
              onUpdate={handleUpdate} 
              onDelete={handleDelete} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservations;
