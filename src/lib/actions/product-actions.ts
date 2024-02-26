"use server"

import { connectToDB } from "@/config/mongoose.config"
import { Product } from "../models/products.model"
import ProductData from "@/app/products.json"
export const getAllProducts = async () => {
    await connectToDB()
    const data = await Product.find({})
    return data
}