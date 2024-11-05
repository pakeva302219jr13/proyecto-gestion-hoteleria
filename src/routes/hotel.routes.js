// src/routes/hotel.routes.js
import express from 'express';
import { getAllHotels, createHotel, getHotelDetails, updateHotel, deleteHotel } from '../controllers/hotel.controller.js';
import { auth } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/role.middleware.js';

const router = express.Router();

// Crear un hotel (requiere autenticación y rol de administrador)
router.post('/', auth, isAdmin, createHotel);

// Obtener todos los hoteles (no requiere autenticación)
router.get('/', getAllHotels);

// Obtener detalles de un hotel específico
router.get('/:id', getHotelDetails);

// Actualizar un hotel específico (requiere autenticación y rol de administrador)
router.put('/:id', auth, isAdmin, updateHotel);

// Eliminar un hotel específico (requiere autenticación y rol de administrador)
router.delete('/:id', auth, isAdmin, deleteHotel);

export default router;
