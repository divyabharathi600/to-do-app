// src/auth.js
import jwt_decode from 'jwt-decode';

export function getToken() {
  return localStorage.getItem('token');
}

export function getUser() {
  const token = getToken();
  if (!token) return null;

  try {
    return jwt_decode(token);
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
}

export function logout() {
  localStorage.removeItem('token');
}
