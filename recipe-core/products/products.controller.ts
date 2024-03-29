import express, { Request, Response } from 'express';
import { Product } from "@prisma/client";
import * as productService from './products.service';
import { CreateProductRequest, ProductDto } from './products.types';
const router = express.Router();

router.get('/:productId', async (req: Request, res: Response<Product | null>) => {
  const productId = req.params.productId;
  const product = await productService.getProduct(parseInt(productId)); 
  res.json(product);
})

router.get('/', async (req: Request, res: Response<Product[]>) => {
  const products = await productService.getAllgetProducts(); 
  res.json(products);
})

router.post('/', async (req: Request<CreateProductRequest>, res: Response) => {
  const product: ProductDto = {
    name: req.body.productName
  } 
  const savedProduct = await productService.saveProduct(product);
  res.json(savedProduct);
})

export default router;