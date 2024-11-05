import { User } from "../database/models/index.js";

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron usuarios',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lista de todos los usuarios',
      data: users,
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios',
    });
  }
};

// Obtener un usuario por su ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró el usuario',
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener el usuario',
    });
  }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
  const { email, password, nombre, apellido, telefono, address } = req.body;

  try {
    const newUser = await User.create({
      email,
      password,
      nombre,
      apellido,
      telefono,
      address,
    });

    return res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: newUser,
    });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear el usuario',
    });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró el usuario',
      });
    }

    await user.destroy();

    return res.status(200).json({
      success: true,
      message: 'Usuario eliminado exitosamente',
    });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar el usuario',
    });
  }
};

// Verificar si el usuario es administrador (solo como ejemplo; depende de si tienes el campo de rol)
export const isUserAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (user && user.isAdmin) {
      return res.status(200).json({
        success: true,
        message: 'El usuario es administrador',
      });
    }

    return res.status(403).json({
      success: false,
      message: 'El usuario no es administrador',
    });
  } catch (error) {
    console.error('Error al verificar rol de administrador:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al verificar rol de administrador',
    });
  }
};
