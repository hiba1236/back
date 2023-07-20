import express, { Router } from 'express';

const router = express.Router();


import { getProducts, addProduct, deleteProduct, updateProduct } from "../controllers/productController.js";

router.get("/products", getProducts);
router.post("/product", addProduct);
router.delete("/product/:id", deleteProduct);
router.put("/product/:id", updateProduct)


export default router;