"use server";

import { connectToDB } from "@/config/mongoose.config";
import { OrderModel } from "../models/order.model";


// export const revalidate = 0;
export const getAllOrders = async () => {
  await connectToDB();
  const data = await OrderModel.find({});
  return data || [];
};
