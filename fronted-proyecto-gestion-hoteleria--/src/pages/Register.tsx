import React from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../services/authService';

interface RegisterFormInputs {
  nombre: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await registerUser(data.nombre, data.email, data.password);
      alert(response.message);
    } catch (error) {
      console.error('Error al registrar el usuario', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Registro</h2>
      <input {...register('nombre')} placeholder="Nombre" required />
      <input {...register('email')} placeholder="Correo" required />
      <input {...register('password')} type="password" placeholder="Contraseña" required />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;
