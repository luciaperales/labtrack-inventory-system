export function calcularEstadoReactivo(cantidad: number): 'Disponible' | 'Critico' | 'Agotado' {
  if (cantidad <= 0) return 'Agotado';
  if (cantidad < 50) return 'Critico'; 
  return 'Disponible';
}