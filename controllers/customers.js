import { Customer } from "../models/customers.js";
import { addNewCustomer, addToCart, DeletedByProductId, displayCart, GetAllOrder } from "../services/customers.js";
import AppError from '../utils/AppError.js'; // Import AppError

export async function Orders(req, res, next) {
  try {
    const order = await GetAllOrder();
    if (!order || order.length === 0) {
      throw new AppError('No orders found', 404); // Custom error if no orders
    }
    res.status(200).json(order);
  } catch (error) {
    next(error); // Pass to global error handler
  }
}

export async function CreateCustomer(req, res, next) {
  const customerDetails = req.body;

  try {
    const NewCustomer = await addNewCustomer(customerDetails);
    if (!NewCustomer) {
      throw new AppError('Failed to create customer', 400); // Custom error if creation fails
    }

    const populatedCustomer = await Customer.findById(NewCustomer._id).populate("cart.product");

    res.status(201).json({
      message: 'Customer created successfully',
      data: populatedCustomer,
    });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

export async function AddToCart(req, res, next) {
  const { customerId, productId, quantity } = req.body;

  try {
    if (!customerId || !productId || !quantity) {
      throw new AppError('Missing required fields: customerId, productId, and quantity', 400); // Validation error
    }

    const result = await addToCart(customerId, productId, quantity);
    if (!result) {
      throw new AppError('Failed to add to cart', 500); // If adding to cart fails
    }

    res.status(200).json(result);
  } catch (error) {
    next(error); // Pass to global error handler
  }
}

export async function GetCart(req, res, next) {
  const id = req.params.id;

  try {
    const customerCart = await displayCart(id);
    if (!customerCart) {
      throw new AppError('Cart not found for the customer', 404); // Custom error if cart is not found
    }

    let totalAmount = 0;
    for (let i = 0; i < customerCart.cart.length; i++) {
      totalAmount += customerCart.cart[i].product.finalPrice * customerCart.cart[i].quantity;
    }

    res.status(200).json({
      cart: customerCart.cart,
      totalAmount: totalAmount,
    });
  } catch (error) {
    next(error); // Pass to global error handler
  }
}

export async function DeletedByCart(req, res, next) {
  const { productId, customerId } = req.params;

  try {
    const result = await DeletedByProductId(productId, customerId);
    if (!result) {
      throw new AppError('Customer or product not found, or product already deleted', 404); // Custom error
    }
    res.status(200).json({ message: "Product removed successfully", data: result.cart });
  } catch (error) {
    next(error); // Pass to global error handler
  }
}
