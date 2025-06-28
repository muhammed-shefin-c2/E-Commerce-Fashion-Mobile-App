import { Product } from "../models/products.js";

export async function createProduct (productData) {
  return await Product.create(productData);
};

export async function getAllProducts() {
  return await Product.find();
};

export async function getProductById(id) {
  return await Product.findById(id);
};

export async function updateProductById(id, data) {
  return await Product.findByIdAndUpdate(id, data);
}

export async function deleteByProductId(id) {
  return await Product.findByIdAndDelete(id);
}