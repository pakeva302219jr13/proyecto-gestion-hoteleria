// src/routes/habitaciones.routes.js
import express from 'express';
import { createRoom, getAllRooms } from '../controllers/habitaciones.controller.js';

const router = express.Router();

// Ruta para crear una habitación
router.post('/', createRoom);

// Ruta para obtener todas las habitaciones
router.get('/', getAllRooms);

export default router;
