// src/components/ReservationActions.tsx
import React from 'react';

const ReservationActions = ({ reservationId, onUpdate, onDelete }: { reservationId: string, onUpdate: (id: string) => void, onDelete: (id: string) => void }) => {
  return (
    <div>
      <button onClick={() => onUpdate(reservationId)}>Actualizar</button>
      <button onClick={() => onDelete(reservationId)}>Eliminar</button>
    </div>
  );
};

export default ReservationActions;
