import type { Reactivo, ReactivoInput } from "@/types/reactivo";

export const API_URL = 'http://localhost:5000/api';

/**
 * Función auxiliar para obtener el token de seguridad guardado
 */
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('labtrack_token');
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };
}

/**
 * POST /api/auth/login (NUEVA: Autenticación)
 */
export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al iniciar sesión');
  return data;
}

/**
 * POST /api/auth/register (NUEVA: Registro)
 */
export async function registrar(nombre: string, email: string, password: string, rol: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password, rol }),
  });
  
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error en el registro');
  return data;
}

/**
 * GET /api/reactivos
 */
export async function getReactivos(): Promise<Reactivo[]> {
  // Las consultas usan las cabeceras para validar el rol del usuario
  const res = await fetch(`${API_URL}/reactivos`, {
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Error al obtener los reactivos');
  
  const datosBackend = await res.json();
  
  return datosBackend.map((item: any) => ({
    id: item.id,
    nombre: item.nombre,
    formula: item.formula,
    cantidad: item.cantidad,
    unidad: item.unidad,
    ubicacion: item.ubicacion,
    estado: item.estado,
    fechaIngreso: item.fecha_ingreso ? item.fecha_ingreso.slice(0, 10) : ''
  }));
}

/**
 * POST /api/reactivos
 */
export async function createReactivo(input: ReactivoInput): Promise<Reactivo> {
  const cuerpoBackend = {
    nombre: input.nombre,
    formula: input.formula,
    cantidad: parseFloat(String(input.cantidad)),
    unidad: input.unidad,
    ubicacion: input.ubicacion,
    estado: input.estado
  };

  const res = await fetch(`${API_URL}/reactivos`, {
    method: "POST",
    headers: getAuthHeaders(), // 
    body: JSON.stringify(cuerpoBackend)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al crear el reactivo');
  }
  const nuevoItem = await res.json();

  return {
    ...nuevoItem,
    fechaIngreso: nuevoItem.fecha_ingreso ? nuevoItem.fecha_ingreso.slice(0, 10) : ''
  };
}

/**
 * PUT /api/reactivos/:id
 */
export async function updateReactivo(id: number, input: ReactivoInput): Promise<Reactivo> {
  const cuerpoBackend = {
    nombre: input.nombre,
    formula: input.formula,
    cantidad: parseFloat(String(input.cantidad)),
    unidad: input.unidad,
    ubicacion: input.ubicacion,
    estado: input.estado
  };

  const res = await fetch(`${API_URL}/reactivos/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(), 
    body: JSON.stringify(cuerpoBackend)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al actualizar el reactivo');
  }
  const itemEditado = await res.json();

  return {
    ...itemEditado,
    fechaIngreso: itemEditado.fecha_ingreso ? itemEditado.fecha_ingreso.slice(0, 10) : ''
  };
}

/**
 * DELETE /api/reactivos/:id
 */
export async function deleteReactivo(id: number | undefined): Promise<void> {
  if (!id) throw new Error('ID no válido para eliminar');

  const res = await fetch(`${API_URL}/reactivos/${id}`, { 
    method: "DELETE",
    headers: getAuthHeaders() // 
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al eliminar el reactivo');
  }
}