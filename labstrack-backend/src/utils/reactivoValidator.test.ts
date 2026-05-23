import { describe, expect, test } from '@jest/globals';
import { calcularEstadoReactivo } from './reactivoValidator';

describe('Pruebas unitarias para la lógica de Reactivos', () => {

  test('Debería retornar "Agotado" si la cantidad es 0 o menor', () => {
    expect(calcularEstadoReactivo(0)).toBe('Agotado');
    expect(calcularEstadoReactivo(-5)).toBe('Agotado');
  });

  test('Debería retornar "Critico" si la cantidad es menor a 50', () => {
    expect(calcularEstadoReactivo(25)).toBe('Critico');
  });

  test('Debería retornar "Disponible" si la cantidad es 50 o mayor', () => {
    expect(calcularEstadoReactivo(500)).toBe('Disponible');
  });

});