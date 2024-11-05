import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

export const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'roles',
  timestamps: false,
});
