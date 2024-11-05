import { hash, genSalt, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

// Encripta una contraseña en texto plano.
export async function hashPassword(plain) {
  const salt = await genSalt(16); 
  return await hash(plain, salt); 
}

// verifica si una contraseña en texto plano coincide con el hash encriptado.
export async function verifyPassword(plain, hash) {
  return await compare(plain, hash); 
}

// genera un token JWT usando el payload proporcionado.
export function jwtEncode(payload) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('No hay llave secreta');
  return jwt.sign(payload, secret); 
}

// decodifica un token JWT sin verificar la firma.
export function jwtDecode(encoded) {
  return jwt.decode(encoded); 
}

// Verifica y valida la firma de un token JWT.
export function jwtVerify(encoded) {
  try {
    const secret = process.env.JWT_SECRET;
    return jwt.verify(encoded, secret); 
 } catch (err) {
    return null;
}
}
