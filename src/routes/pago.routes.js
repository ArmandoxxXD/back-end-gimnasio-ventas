import { Router } from "express";
import { addCorteDiario, addPago, getPagos, removePago, getCorteDiario, getCorteMes, getCorteA, getCortes } from "../controllers/pago.controller";

const router = Router();


router.get('/api/Pago/', getPagos)
router.post('/api/Pago/', addPago)
router.delete('/api/Pago/:id',  removePago)


router.post('/api/CorteDiarioAdd/',  addCorteDiario)
router.get('/api/Cortes/', getCortes)
router.get('/api/CorteDiario/',  getCorteDiario)
router.get('/api/CorteMes/:mes',  getCorteMes)
router.get('/api/CorteAnio/:anio',  getCorteA)
export default router;