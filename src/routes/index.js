// src/routes/index.js
import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './users.routes.js';
import hotelRoutes from './hotel.routes.js';
import reservationRoutes from './reservations.routes.js';

const router = express.Router();

// Definir rutas usando las importaciones correctas
router.use('/hoteles', hotelRoutes);           // Rutas de hoteles
router.use('/reservas', reservationRoutes);    // Rutas de reservas
router.use('/auth', authRoutes);               // Rutas de autenticación
router.use('/usuarios', userRoutes);           // Rutas de usuarios

export default router;
