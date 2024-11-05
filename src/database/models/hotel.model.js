import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

export const Hotel = sequelize.define('Hotel', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ciudad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clasificacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hora_entrada: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  hora_salida: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  ubicacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numeroHabitaciones: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  servicios: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  precio_por_noche: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'hoteles',
  timestamps: true,
});
