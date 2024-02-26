"use server";

import { connectToDB } from "@/config/mongoose.config";
import { Product } from "../models/products.model";
import ProductData from "@/app/products.json";
export const getAllProducts = async () => {
  await connectToDB();
  const data = await Product.find({});
  return data || [];
};


// export const revalidate = 0;
export const getProduct = async (_id: string) => {
  await connectToDB();
  const data = await Product.findById(_id);
  return data 
};
// export const createOrUpdateProduct = async (data: ProductData) => {}
