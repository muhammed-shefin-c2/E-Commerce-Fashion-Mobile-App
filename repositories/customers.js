import { Customer } from "../models/customers.js";
import { Product } from "../models/products.js";

export async function createCustomer(customerDetails) {
  return await Customer.create(customerDetails);
};

export async function getCart(id) {
  return await Customer.findById(id).select("cart").populate('cart.product');
};

export async function deleteProductById(productId, customerId) {
  const customer = await Customer.findByIdAndUpdate(
    customerId,
    {
      $pull: {cart: {product: productId}}
    },
    {new: true}
  ).populate("cart.product");
  return customer;
};

export async function getOrder() {
  const customer = await Customer.find({
    cart: {$exists: true, $not: {$size: 0}}
  }).populate('cart.product');
  return customer;
};
