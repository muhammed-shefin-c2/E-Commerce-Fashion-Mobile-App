import mongoose from "mongoose";

const produtSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  category: {
    required: true,
    type: String
  },
  brand: {
    required: true,
    type: String
  },
  qty: {
    required: true,
    type: Number
  },
  offer: {
    required: true,
    type: Number
  },
  price: {
    required: true,
    type: Number
  },
  finalPrice: {
    type: Number
  }
})

export const Product = mongoose.model('Product', produtSchema);