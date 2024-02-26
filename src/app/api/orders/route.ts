import { connectToDB } from "@/config/mongoose.config";
import { OrderModel } from "@/lib/models/order.model";

export async function GET(req: Request) {
  await connectToDB();
  const data = await OrderModel.find({});
  return Response.json(data);
}
