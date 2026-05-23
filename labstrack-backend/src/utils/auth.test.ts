import { describe, expect, it, beforeEach, jest, test } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { verificarToken, esAdministrador, AuthenticatedRequest } from '../middlewares/auth.middleware';
import { Response, NextFunction } from 'express';

describe(' Suite de Pruebas: Filtros de Seguridad (JWT)', () => {
  let mockRequest: Partial<AuthenticatedRequest>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    // Reestablece los mocks antes de cada test
    mockRequest = {
      headers: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis() as unknown as Response['status'],
      json: jest.fn() as unknown as Response['json']
    };
    nextFunction = jest.fn();
    process.env.JWT_SECRET = 'ClaveSecretaDePrueba123';
  });

  // TEST 1: Bloqueo por falta de credenciales
  it('Debería retornar un error 401 si la petición no incluye el encabezado Authorization', () => {
    verificarToken(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Acceso denegado. No se proporcionó un token de seguridad.'
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  // TEST 2: Bloqueo por token alterado o inválido
  it('Debería retornar un error 403 si el token fue manipulado o es inválido', () => {
    mockRequest.headers = {
      authorization: 'Bearer token_falso_y_alterado'
    };

    verificarToken(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Token inválido o expirado.'
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  // TEST 3: Autorización exitosa de Token válido
  it('Debería validar un JWT correcto, inyectar el payload del usuario y dar acceso (next)', () => {
    const payloadUsuario = { id: 1, email: 'analista@laboratorio.com', rol: 'analista' };
    const tokenValido = jwt.sign(payloadUsuario, process.env.JWT_SECRET!);

    mockRequest.headers = {
      authorization: `Bearer ${tokenValido}`
    };

    verificarToken(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
    expect(mockRequest.usuarioLogueado).toBeDefined();
    expect(mockRequest.usuarioLogueado?.rol).toBe('analista');
  });

  // TEST 4: Control de Acceso basado en Roles (RBAC) - Bloqueo a Analistas
  it('Debería denegar el acceso con un error 403 si un "analista" intenta usar una ruta de "administrador"', () => {
    mockRequest.usuarioLogueado = { id: 1, email: 'analista@laboratorio.com', rol: 'analista' };

    esAdministrador(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Permisos insuficientes. Se requiere rol de Administrador.'
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  // TEST 5: Control de Acceso basado en Roles (RBAC) - Acceso a Administradores
  it('Debería otorgar acceso libre si el usuario logueado cuenta con el rol de "administrador"', () => {
    mockRequest.usuarioLogueado = { id: 2, email: 'jefe_planta@laboratorio.com', rol: 'administrador' };

    esAdministrador(mockRequest as AuthenticatedRequest, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
  });
});