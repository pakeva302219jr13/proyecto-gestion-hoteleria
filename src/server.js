import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { sequelize } from './database/connection.js';
import routes from './routes/index.js';
import hotelRoutes from './routes/hotel.routes.js';
import reservationRoutes from './routes/reservations.routes.js';
import habitacionesRoutes from './routes/habitaciones.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import { User, Role } from './database/models/index.js';
import bcrypt from 'bcryptjs';

dotenv.config(); 

async function main() {
  await sequelize.sync(); 

  const PORT = +process.env.APP_PORT || 4000; 
  const app = express();

  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    res.send('Bienvenidos a Hoteles JR');
  });

  app.use('/api', routes);
  app.use('/auth', authRoutes);
  app.use('/api/hoteles', hotelRoutes);
  app.use('/api/reservas', reservationRoutes);
  app.use('/api/usuarios', userRoutes);
  app.use('/api/habitaciones', habitacionesRoutes);
  
  // Llama a la función para verificar y crear el administrador si es necesario
  await checkAndCreateAdmin();

  const port = process.env.APP_PORT || 4000;
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });

  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
}

// Función para verificar y crear el rol y usuario administrador
const checkAndCreateAdmin = async () => {
  try {
    // Verifica si existe el rol de administrador, sino lo crea
    const [adminRole, created] = await Role.findOrCreate({
      where: { nombre: 'admin' },
    });

    // Verifica si el usuario administrador existe
    const existingAdmin = await User.findOne({ where: { email: 'JRplayadmin@gmail.com' } });
    if (!existingAdmin) {
      // Encripta la contraseña y crea el usuario administrador
      const hashedPassword = await bcrypt.hash('12345678', 10);

      const adminUser = await User.create({
        email: 'JRplayadmin@gmail.com',
        password: hashedPassword,
        nombre: 'Admin',
        apellido: 'User',
      });

      // Asigna el rol de administrador al nuevo usuario
      await adminUser.addRole(adminRole);

      console.log('Usuario administrador creado y asignado al rol de administrador');
    } else {
      console.log('El usuario administrador ya existe');
    }
  } catch (error) {
    console.error('Error al conectar con la base de datos o al realizar la prueba de roles:', error);
  }
};

main().catch(err => {
  console.error('Error al iniciar el servidor:', err);
});
