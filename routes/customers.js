import express from 'express';
import { AddToCart, CreateCustomer, DeletedByCart, GetCart, Orders } from '../controllers/customers.js';
import { asyncHandler } from '../middleware/asyncHandler.js';


const router = express.Router();

router.post('/', asyncHandler(CreateCustomer));

router.post("/addtocart", asyncHandler(AddToCart));

router.get("/cart/:id", asyncHandler(GetCart));

router.delete("/customercart/:customerId/:productId", asyncHandler(DeletedByCart));

router.get("/order", asyncHandler(Orders));

export default router;