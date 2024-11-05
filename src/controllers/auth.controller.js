// src/controllers/auth.controller.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Role } from '../database/models/index.js';

// Expresión regular para validar el formato del correo electrónico
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Registro de usuario
export const register = async (req, res) => {
  const { email, password, nombre, apellido, telefono, address, roleName } = req.body;

  try {
    // Validación de formato de correo
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'El correo electrónico no es válido',
      });
    }

    // Verificar longitud mínima de la contraseña
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener al menos 8 caracteres',
      });
    }

    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Correo ya registrado. Por favor, intenta con otro correo.',
      });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = await User.create({
      email,
      password: hashedPassword,
      nombre,
      apellido,
      telefono,
      address,
    });

    // Asignar rol al usuario
    const role = await Role.findOne({ where: { nombre: roleName || 'user' } });
    if (role) {
      await newUser.addRole(role);
    } else {
      console.warn(`Rol '${roleName || 'user'}' no encontrado. Verifica que el rol existe en la base de datos.`);
    }

    // Responder sin incluir la contraseña por seguridad
    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        id: newUser.id,
        email: newUser.email,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        telefono: newUser.telefono,
        address: newUser.address,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar usuario',
    });
  }
};

// Inicio de sesión
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por correo
    const user = await User.findOne({
      where: { email },
      include: { model: Role, attributes: ['nombre'] },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas',
      });
    }

    // Obtener los roles del usuario
    const roles = user.Roles.map(role => role.nombre);

    // Generar JWT
    const token = jwt.sign(
      { userId: user.id, roles }, // Incluye roles en el token
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso',
      token,
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
    });
  }
};
