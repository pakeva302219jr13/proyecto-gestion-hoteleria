import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

export const UserRole = sequelize.define('UserRole', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  rol_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Role',
      key: 'id'
    }
  }
}, {
  tableName: 'user_roles',
  timestamps: false,
});
