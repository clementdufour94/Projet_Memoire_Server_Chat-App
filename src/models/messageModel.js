import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Message = sequelize.define(
  'Message',
  {
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'messages',
    timestamps: true,  // Cela ajoute automatiquement les colonnes `createdAt` et `updatedAt`
  }
);

export default Message;