import { createProduct , deleteByProductId, getAllProducts, getProductById, updateProductById} from "../repositories/products.js";

export async function addnewProduct(productData) {
  const {price, offer} = productData;

  const finalPrice = price - (price * offer/100);

  const fullData = {...productData, finalPrice};

  const newProduct = await createProduct(fullData);

  return newProduct;
};

export async function AllProduct() {
  const products = getAllProducts();
  return products;
};

export async function ProductById(id) {
  const product = getProductById(id);
  return product;
};

export async function UpdatebyId(id, data) {
  let {price, offer} = data;

  if(price === undefined || offer === undefined) {
    const existingProduct = await ProductById(id);
    if (price === undefined) price = existingProduct.price;
    if (offer === undefined) offer = existingProduct.offer;
  }

  if (typeof price === 'number' && typeof offer === 'number') {
    data.finalPrice = price - (price * offer/100);
  }

  const updated = await updateProductById(id, data);
  return updated;
};

export async function DeletedById(id) {
  const deleted = deleteByProductId(id);
  return deleted;
}

