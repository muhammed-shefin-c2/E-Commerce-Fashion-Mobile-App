import { addnewProduct, AllProduct, DeletedById, ProductById, UpdatebyId } from "../services/products.js";
import AppError from "../utils/AppError.js"; // Import the AppError class

export async function CreateProduct(req, res, next) {
  try {
    const productData = req.body;

    const newProduct = await addnewProduct(productData);

    res.status(201).json({
      message: 'Product created successfully',
      data: newProduct
    });
  } catch (error) {
    // Create an operational error for this scenario
    return next(new AppError('Failed to create product', 500));
  }
}

export async function GetAllProducts(req, res, next) {
  try {
    const products = await AllProduct();

    if (!products || products.length === 0) {
      // If no products are found, create a 404 error
      return next(new AppError('No products found', 404));
    }

    res.status(200).json(products);
  } catch (error) {
    // Create a general operational error
    return next(new AppError('Failed to retrieve products', 500));
  }
}

export async function GetProductById(req, res, next) {
  try {
    const id = req.params.id;
    const product = await ProductById(id);

    if (!product) {
      // If product not found, return a 404 error
      return next(new AppError('Product not found', 404));
    }

    res.status(200).json(product);
  } catch (error) {
    // Handle unexpected errors
    return next(new AppError('Failed to retrieve product', 500));
  }
}

export async function UpdateProductById(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedProduct = await UpdatebyId(id, data);

    if (!updatedProduct) {
      // If product not found or update failed, create a 404 error
      return next(new AppError('Product not found or failed to update', 404));
    }

    // Retrieve the updated product to send in response
    const updatedData = await ProductById(id);
    res.status(200).json(updatedData);
  } catch (error) {
    // Handle unexpected errors during update
    return next(new AppError('Failed to update product', 500));
  }
}

export async function DeleteByProductId(req, res, next) {
  try {
    const id = req.params.id;

    const deletedProduct = await DeletedById(id);

    if (!deletedProduct) {
      // If the product is not found or failed to delete, return a 404 error
      return next(new AppError('Product not found or failed to delete', 404));
    }

    res.status(200).json({
      message: 'Product deleted successfully',
      data: deletedProduct
    });
  } catch (error) {
    // Handle unexpected errors during deletion
    return next(new AppError('Failed to delete product', 500));
  }
}
