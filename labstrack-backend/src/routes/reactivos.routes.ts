import { Router } from 'express';
import { getReactivos, createReactivo, updateReactivo, deleteReactivo } from '../controllers/reactivos.controller';

const router = Router();

router.get('/', getReactivos);
router.post('/', createReactivo);
router.put('/:id', updateReactivo);
router.delete('/:id', deleteReactivo); 

export default router;
