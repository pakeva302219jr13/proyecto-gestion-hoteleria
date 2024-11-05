// src/controllers/reservations.controller.js
import { Reservation } from '../database/models/reservations.model.js';
import { User } from '../database/models/user.model.js';
import { Hotel } from '../database/models/hotel.model.js';
import { Habitacion } from '../database/models/habitacion.model.js';

// Crear una nueva reserva
export const createReservation = async (req, res) => {
  const { usuario_id, habitacion_id, fecha_entrada, fecha_salida } = req.body;

  try {
    const newReservation = await Reservation.create({
      usuario_id,
      habitacion_id,
      fecha_entrada,
      fecha_salida,
      estado_reserva: 'activa'
    });

    return res.status(201).json({
      success: true,
      message: 'Reserva creada exitosamente',
      data: newReservation,
    });
  } catch (error) {
    console.error('Error al crear la reserva:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear la reserva',
    });
  }
};

// Obtener todas las reservas (solo para administradores)
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        { model: User, attributes: ['nombre', 'apellido'] },
        { model: Hotel, attributes: ['nombre', 'direccion'] },
        { model: Habitacion, attributes: ['numero_habitacion', 'tipo'] }
      ]
    });

    return res.status(200).json({
      success: true,
      data: reservations,
    });
  } catch (error) {
    console.error('Error al obtener todas las reservas:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener todas las reservas',
    });
  }
};

// Obtener reservas por usuario
export const getReservationsByUser = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const reservations = await Reservation.findAll({
      where: { usuario_id }
    });

    if (!reservations.length) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron reservas para este usuario',
      });
    }

    return res.status(200).json({
      success: true,
      data: reservations,
    });
  } catch (error) {
    console.error('Error al obtener reservas por usuario:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener reservas',
    });
  }
};

// Actualizar una reserva
export const updateReservation = async (req, res) => {
  const { id } = req.params;
  const { fecha_entrada, fecha_salida, estado_reserva } = req.body;
  const userId = req.user.id; // Usuario autenticado

  try {
    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reserva no encontrada',
      });
    }

    // Verificar si el usuario autenticado es el creador de la reserva o un administrador
    const isOwner = reservation.usuario_id === userId;
    const isAdmin = req.user.Roles && req.user.Roles.some(role => role.nombre === 'admin');

    if (isOwner || isAdmin) {
      await reservation.update({ fecha_entrada, fecha_salida, estado_reserva });
      return res.status(200).json({
        success: true,
        message: 'Reserva actualizada exitosamente',
        data: reservation,
      });
    } else {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para actualizar esta reserva',
      });
    }
  } catch (error) {
    console.error('Error al actualizar la reserva:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la reserva',
    });
  }
};

// Eliminar una reserva
export const deleteReservation = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Usuario autenticado

  try {
    const reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reserva no encontrada',
      });
    }

    // Verificar si el usuario autenticado es el creador de la reserva o un administrador
    const isOwner = reservation.usuario_id === userId;
    const isAdmin = req.user.Roles && req.user.Roles.some(role => role.nombre === 'admin');

    if (isOwner || isAdmin) {
      await reservation.destroy();
      return res.status(200).json({
        success: true,
        message: 'Reserva eliminada exitosamente',
      });
    } else {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para eliminar esta reserva',
      });
    }
  } catch (error) {
    console.error('Error al eliminar la reserva:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar la reserva',
    });
  }
};
