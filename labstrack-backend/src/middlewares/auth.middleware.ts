import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extender la interfaz de Express para poder guardar los datos del usuario dentro de la petición
export interface AuthenticatedRequest extends Request {
  usuarioLogueado?: {
    id: number;
    email: string;
    rol: string;
  };
}

export const verificarToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Buscar el token en las cabeceras de la petición (Authorization: Bearer TOKEN)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token de seguridad.' });
  }

  try {
    const secreto = process.env.JWT_SECRET || 'secret';
    // Verificar si el token es válido y no expiró
    const verificado = jwt.verify(token, secreto) as any;
    
    // Inyectar los datos del usuario en la petición para que los controladores puedan usarlos
    req.usuarioLogueado = {
      id: verificado.id,
      email: verificado.email,
      rol: verificado.rol
    };

    next(); // 
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado.' });
  }
};

// Solo deja pasar si el rol es estrictamente Administrador
export const esAdministrador = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.usuarioLogueado?.rol !== 'administrador') {
    return res.status(403).json({ error: 'Permisos insuficientes. Se requiere rol de Administrador.' });
  }
  next();
};