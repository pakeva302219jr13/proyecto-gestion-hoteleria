import express from 'express';
import { getAllUsers, getUserById, createUser, deleteUser, isUserAdmin } from '../controllers/users.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', auth, getAllUsers);          // Obtener todos los usuarios
router.get('/:id', auth, getUserById);       // Obtener usuario por ID
router.post('/', createUser);                // Crear un nuevo usuario
router.delete('/:id', auth, deleteUser);     // Eliminar usuario por ID
router.get('/:id/admin', auth, isUserAdmin); // Verificar si un usuario es administrador

export default router;
