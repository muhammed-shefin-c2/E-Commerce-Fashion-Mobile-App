import express from 'express';
import { CreateProduct, DeleteByProductId, GetAllProducts , GetProductById, UpdateProductById} from '../controllers/products.js'; 
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();



 router.post('/', asyncHandler(CreateProduct));

 router.get('/',asyncHandler(GetAllProducts));

 router.get('/:id', asyncHandler(GetProductById));

 router.patch('/update/:id', asyncHandler(UpdateProductById));

 router.delete('/delete/:id', asyncHandler(DeleteByProductId));

export default router;