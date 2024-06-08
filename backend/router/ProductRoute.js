import express from "express";
import {
  GetProduct,
  GetProductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} from "../controller/ProductController.js";
import { uploadFile } from "../controller/ProductController.js";

const router = express.Router()

router.get('/product', GetProduct)
router.get('/product/:id', GetProductById)
router.post('/product', uploadFile.single('gambarproduk'), CreateProduct)
router.patch('/product/:id', uploadFile.single('gambarproduk'), UpdateProduct)
router.delete('/product/:id',DeleteProduct)

export default router