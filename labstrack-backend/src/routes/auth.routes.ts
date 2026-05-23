import { Router } from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/auth.controller';

const router = Router();

// Rutas para la gestión de accesos
router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);

export default router;