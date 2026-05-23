import type { Reactivo, ReactivoInput } from "@/types/reactivo";

export const API_URL = 'http://localhost:5000/api/reactivos';

/**
 * GET /api/reactivos
 */
export async function getReactivos(): Promise<Reactivo[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener los reactivos');
  
  const datosBackend = await res.json();
  
  // Mapear los datos del backend de snake_case a camelCase para la UI
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
  // Convertir el objeto de Lovable al formato snake_case que espera Postgres
  const cuerpoBackend = {
    nombre: input.nombre,
    formula: input.formula,
    cantidad: parseFloat(String(input.cantidad)),
    unidad: input.unidad,
    ubicacion: input.ubicacion,
    estado: input.estado
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cuerpoBackend)
  });

  if (!res.ok) throw new Error('Error al crear el reactivo');
  const nuevoItem = await res.json();

  // Devolver el objeto mapeado de vuelta a camelCase para la UI
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

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cuerpoBackend)
  });

  if (!res.ok) throw new Error('Error al actualizar el reactivo');
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

  const res = await fetch(`${API_URL}/${id}`, { 
    method: "DELETE" 
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al eliminar el reactivo');
  }
}