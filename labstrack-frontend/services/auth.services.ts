const API_URL = 'http://localhost:5000/api/auth';

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Error al iniciar sesión');
  return data; // Retorna { message, token, usuario: { id, nombre, email, rol } }
};

export const registrar = async (nombre: string, email: string, password: string, rol: string) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password, rol }),
  });
  
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Error en el registro');
  return data;
};