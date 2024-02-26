import Razorpay from "razorpay";
import { connectToDB } from "@/config/mongoose.config";
import crypto from "crypto";
import { OrderModel } from "@/lib/models/order.model";
import { Payment } from "@/lib/models/payment.model";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY as string,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

export async function POST(req: Request) {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId,
    createdId,
  } = await req.json();

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = await crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET as string)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    await connectToDB();
    const updateOrderPromise = OrderModel.findOneAndUpdate(
      { orderId: orderId },
      { paymentId: razorpay_payment_id, status: "paid" }
    );
    const createPaymentPromise = Payment.create({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      createdId: createdId,
    });

    // Wait for both operations to complete
    const [order, payment] = await Promise.all([
      updateOrderPromise,
      createPaymentPromise,
    ]);
    if (payment && order)
      return Response.json({ message: "Payment successful", order, payment });

    return Response.json({ error: "Filed to create payment" });
  }
  return Response.json({ error: "Failed to authenticate payment" });
}
