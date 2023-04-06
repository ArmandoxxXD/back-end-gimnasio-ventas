import { Router } from "express";
import {  getProductByCodeBar, searchProductByName, searchProductByType } from "../controllers/products.controller";

const router = Router();



router.get('/api/Products/:codeBar', getProductByCodeBar);

router.get('/api/Products/searchName/:name', searchProductByName);
router.get('/api/Products/searchType/:type', searchProductByType);
export default router;