// src/database/models/habitacion.model.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

export const Habitacion = sequelize.define('Habitacion', {
  numero_habitacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('doble', 'individual', 'suite'),
    allowNull: false,
  },
  estado_habitacion: {
    type: DataTypes.ENUM('disponible', 'reservada', 'ocupada'),
    allowNull: false,
    defaultValue: 'disponible',
  },
  hotel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hoteles',
      key: 'id'
    }
  }
}, {
  tableName: 'habitaciones',
  timestamps: false,
});
