import { connectToDB } from "@/config/mongoose.config";
import { Product } from "@/lib/models/products.model";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: any) {
  const { _id } = res.params;
  await connectToDB();
  const data = await Product.findById(_id);
  return Response.json(data);
}
