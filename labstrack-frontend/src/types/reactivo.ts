export type EstadoReactivo = "Disponible" | "Critico" | "Agotado";
export type UnidadReactivo = "g" | "kg" | "ml" | "L";

export interface Reactivo {
  id: number;
  nombre: string;
  formula?: string;
  cantidad: number;
  unidad: UnidadReactivo;
  ubicacion: string;
  fechaIngreso: string; // ISO
  estado: EstadoReactivo;
}

export type ReactivoInput = Omit<Reactivo, "id" | "fechaIngreso"> & {
  fechaIngreso?: string;
};
