import mongoose from "mongoose";
import { Product } from "./products.js";

const address_Schema = new mongoose.Schema({
  addressLine: {
    required: true,
    type: String
  },
  city: {
    required: true,
    type: String
  },
  pinCode: {
    required: true,
    type: Number
  }
});

const customeres_Schema = new mongoose.Schema({
  name: {
    require: true,
    type: String
  },
  address: address_Schema,
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ]
});

export const Customer = mongoose.model('Customer', customeres_Schema);