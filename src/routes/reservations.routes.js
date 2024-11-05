// src/routes/reservations.routes.js
import express from 'express';
import { 
  createReservation, 
  getAllReservations, 
  getReservationsByUser, 
  updateReservation, 
  deleteReservation 
} from '../controllers/reservations.controller.js';
import { auth } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/role.middleware.js';

const router = express.Router();

// Crear una reserva (requiere autenticación)
router.post('/', auth, createReservation);

// Obtener todas las reservas (requiere autenticación y rol de administrador)
router.get('/', auth, isAdmin, getAllReservations);

// Obtener reservas de un usuario específico (requiere autenticación)
router.get('/usuario/:usuario_id', auth, getReservationsByUser);

// Actualizar una reserva (requiere autenticación)
router.put('/:id', auth, updateReservation);

// Eliminar una reserva (requiere autenticación)
router.delete('/:id', auth, deleteReservation);

export default router;
