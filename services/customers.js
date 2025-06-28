import { Product } from "../models/products.js";
import { createCustomer, deleteProductById, getCart, getOrder } from "../repositories/customers.js";
import { Customer } from "../models/customers.js";


export async function addNewCustomer(customerDetails) {
  const NewCustomer = await createCustomer(customerDetails);
  return NewCustomer;
};

export async function addToCart(customerId, productId, quantity) {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  if (product.qty < quantity) throw new Error("Not enough stock availabel");


  product.qty -= quantity;
  await product.save();

  const customer = await Customer.findById(customerId);
  if (!customer) throw new Error("Customer not found");

  customer.cart.push({
    product: productId,
    quantity: quantity
  });
  await customer.save();

  return {message: "Order placed succesfully"};
};

export async function displayCart(id) {
  const CustomerCart = await getCart(id);

  return CustomerCart;
};

export async function DeletedByProductId(productId, customerId) {
  const Deleted = await deleteProductById(productId, customerId);
  return Deleted;
}

export async function GetAllOrder() {
  const order = await getOrder();
  return order;
}