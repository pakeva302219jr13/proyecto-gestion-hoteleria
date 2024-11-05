// src/controllers/habitaciones.controller.js
import { Habitacion } from '../database/models/habitacion.model.js';

// Crear una nueva habitación
export const createRoom = async (req, res) => {
  const { numero_habitacion, tipo, estado_habitacion, hotel_id } = req.body;

  try {
    const newRoom = await Habitacion.create({
      numero_habitacion,
      tipo,
      estado_habitacion,
      hotel_id,
    });

    return res.status(201).json({
      success: true,
      message: 'Habitación creada exitosamente',
      data: newRoom,
    });
  } catch (error) {
    console.error('Error al crear la habitación:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear la habitación',
    });
  }
};

// Obtener todas las habitaciones
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Habitacion.findAll();
    return res.status(200).json({
      success: true,
      data: rooms,
    });
  } catch (error) {
    console.error('Error al obtener habitaciones:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener habitaciones',
    });
  }
};
