import { Router } from 'express';
import { getReactivos, createReactivo, updateReactivo, deleteReactivo } from '../controllers/reactivos.controller';
import { verificarToken, esAdministrador } from '../middlewares/auth.middleware';

const router = Router();

// Rutas públicas (Cualquier analista del laboratorio puede ver el stock)
router.get('/', getReactivos);

// Rutas protegidas (Se necesita token válido)
router.post('/', verificarToken, createReactivo);
router.put('/:id', verificarToken, updateReactivo);

// Ruta protegida (Solo usuarios verificados que además sean administradores)
router.delete('/:id', [verificarToken, esAdministrador], deleteReactivo);

export default router;
