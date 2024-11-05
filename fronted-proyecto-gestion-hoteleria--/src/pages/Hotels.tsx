import { useState, useEffect } from 'react';
import { getHoteles } from '../services/hoteleService';
import { Link } from 'react-router-dom';

interface Hotel {
  id: number;
  nombre: string;
  direccion: string;
  clasificacion: number;
  precio_por_noche: number;
}

const Hotels = () => {
  const [hoteles, setHoteles] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHoteles = async () => {
      try {
        const hotelsData = await getHoteles();
        setHoteles(hotelsData);
      } catch (error) {
        setError('Error al obtener los hoteles');
      } finally {
        setLoading(false);
      }
    };
    fetchHoteles();
  }, []);

  if (loading) return <p>Cargando hoteles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Hoteles</h2>
      <ul>
        {hoteles.map((hotel) => (
          <li key={hotel.id}>
            <h3>{hotel.nombre}</h3>
            <p>Clasificación: {hotel.clasificacion} estrellas</p>
            <p>Precio por noche: ${hotel?.precio_por_noche || 'No especificado'}</p>
            <Link to={`/hoteles/${hotel.id}`}>Ver detalles</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hotels;
