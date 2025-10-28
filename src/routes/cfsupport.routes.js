import express from 'express';
import {
  getAllSupport,
  getSupportById,
  createSupport,
  updateSupport,
  deleteSupport
} from '../controllers/cfsupport.controller.js';

const router = express.Router();

// GET /api/cfsupport - Listar todos os suportes
router.get('/', getAllSupport);

// GET /api/cfsupport/:id - Buscar suporte por ID
router.get('/:id', getSupportById);

// POST /api/cfsupport - Criar novo suporte
router.post('/', createSupport);

// PUT /api/cfsupport/:id - Atualizar suporte
router.put('/:id', updateSupport);

// DELETE /api/cfsupport/:id - Deletar suporte
router.delete('/:id', deleteSupport);

export default router;

