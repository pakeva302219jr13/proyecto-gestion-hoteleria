import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHotelDetails } from '../services/hoteleService';

interface HotelDetails {
  nombre: string;
  direccion: string;
  clasificacion: number;
  precio_por_noche: number;
  descripcion?: string;
}

const HotelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<HotelDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const hotelData = await getHotelDetails(id!);
        setHotel(hotelData);
      } catch (error) {
        setError('Error al obtener los detalles del hotel');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  if (loading) return <p>Cargando detalles del hotel...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{hotel?.nombre}</h2>
      <p>Dirección: {hotel?.direccion}</p>
      <p>Clasificación: {hotel?.clasificacion} estrellas</p>
      <p>Precio por noche: ${hotel?.precio_por_noche || 'no especificado'}</p>
      <p>{hotel?.descripcion || 'Elegancia sin límites, hospitalidad sin igual'}</p>
    </div>
  );
};

export default HotelDetails;
