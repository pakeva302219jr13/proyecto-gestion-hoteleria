// src/middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
import { User, Role } from '../database/models/index.js';

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(403).json({
      success: false,
      message: 'No hay token de autorización',
    });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Encontrar el usuario e incluir los roles asociados
    const user = await User.findByPk(decoded.userId, {
      include: { model: Role, attributes: ['nombre'] }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    req.user = user; // Asigna el usuario al objeto de solicitud
    next();
  } catch (error) {
    console.error('Error de autenticación:', error);
    res.status(401).json({
      success: false,
      message: 'Token no válido o expirado',
    });
  }
};
