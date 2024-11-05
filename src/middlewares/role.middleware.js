// src/middlewares/role.middleware.js
import { User, Role } from '../database/models/index.js';

export const isAdmin = async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(403).json({
      success: false,
      message: 'Usuario no autenticado',
    });
  }

  try {
    const user = await User.findByPk(userId, {
      include: {
        model: Role,
        where: { nombre: 'admin' },
        attributes: ['nombre'],
      },
    });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: 'Acceso solo para administrador',
      });
    }

    next();
  } catch (error) {
    console.error('Error al verificar el rol del usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al verificar permisos',
    });
  }
};
