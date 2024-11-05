import { Hotel } from '../database/models/hotel.model.js';

// Crear un nuevo hotel
export const createHotel = async (req, res) => {
  const { nombre, direccion, ciudad, clasificacion, foto, hora_entrada, hora_salida, ubicacion, numeroHabitaciones, servicios, precio_por_noche } = req.body;

  console.log("Datos recibidos para la creación del hotel:", req.body);

  // Validación manual de campos requeridos
  if (!nombre || !direccion || !ciudad || !clasificacion || !hora_entrada || !hora_salida || !ubicacion || !numeroHabitaciones || !precio_por_noche) {
    return res.status(400).json({
      success: false,
      message: 'Faltan datos requeridos',
    });
  }

  try {
    // Verificar si el hotel ya existe por nombre y dirección
    const existingHotel = await Hotel.findOne({ where: { nombre, direccion } });
    if (existingHotel) {
      return res.status(409).json({
        success: false,
        message: 'El hotel ya existe con ese nombre y dirección',
      });
    }

    // Crear nuevo hotel si no existe
    const newHotel = await Hotel.create({
      nombre,
      direccion,
      ciudad,
      clasificacion,
      foto,
      hora_entrada,
      hora_salida,
      ubicacion,
      numeroHabitaciones,
      servicios,
      precio_por_noche,
    });

    return res.status(201).json({
      success: true,
      message: 'Hotel creado con éxito',
      data: newHotel,
    });
  } catch (error) {
    console.error('Detalles del error al crear el hotel:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Faltan datos requeridos',
        details: error.errors ? error.errors.map(e => e.message) : error.message,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Error al crear el hotel',
      });
    }
  }
};

// Obtener todos los hoteles
export const getAllHotels = async (req, res) => {
  try {
    const hoteles = await Hotel.findAll();
    if (!hoteles || hoteles.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron hoteles',
      });
    }
    res.status(200).json({
      success: true,
      data: hoteles,
    });
  } catch (error) {
    console.error('Error al obtener hoteles:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener hoteles',
    });
  }
};

// Obtener detalles de un hotel específico
export const getHotelDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró el hotel',
      });
    }

    return res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    console.error('Error al obtener detalles del hotel:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener detalles del hotel',
    });
  }
};

// Actualizar un hotel específico
export const updateHotel = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, ciudad, clasificacion, foto, hora_entrada, hora_salida, ubicacion, numeroHabitaciones, servicios, precio_por_noche } = req.body;

  try {
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel no encontrado',
      });
    }

    await hotel.update({
      nombre,
      direccion,
      ciudad,
      clasificacion,
      foto,
      hora_entrada,
      hora_salida,
      ubicacion,
      numeroHabitaciones,
      servicios,
      precio_por_noche,
    });

    return res.status(200).json({
      success: true,
      message: 'Hotel actualizado exitosamente',
      data: hotel,
    });
  } catch (error) {
    console.error('Error al actualizar el hotel:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar el hotel',
    });
  }
};

// Eliminar un hotel específico
export const deleteHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findByPk(id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel no encontrado',
      });
    }

    await hotel.destroy();

    return res.status(200).json({
      success: true,
      message: 'Hotel eliminado exitosamente',
    });
  } catch (error) {
    console.error('Error al eliminar el hotel:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar el hotel',
    });
  }
};
