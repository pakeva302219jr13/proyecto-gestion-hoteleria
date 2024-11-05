// src/database/models/reservations.model.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';
import { Hotel } from './hotel.model.js';
import { Habitacion } from './habitacion.model.js';

export const Reservation = sequelize.define('Reservation', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  habitacion_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'habitaciones',
      key: 'id'
    }
  },
  fecha_entrada: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_salida: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado_reserva: {
    type: DataTypes.ENUM('activa', 'cancelada', 'completada'),
    defaultValue: 'activa',
    allowNull: false,
  }
}, {
  timestamps: true,
  tableName: 'reservas'
});

// Relación entre Habitacion y Reservation
Habitacion.hasMany(Reservation, { foreignKey: 'habitacion_id', onDelete: 'CASCADE' });
Reservation.belongsTo(Habitacion, { foreignKey: 'habitacion_id', onDelete: 'CASCADE' });
