"use server";
import { z } from "zod";
import { checkoutSchema } from "../schemas/user-schema";
import { OrderItem, RazorpayPaymentSuccess } from "../interface";
import Razorpay from "razorpay";
import products from "razorpay/dist/types/products";
import { Orders } from "razorpay/dist/types/orders";
import { IOrder, OrderModel } from "../models/order.model";
import { connectToDB } from "@/config/mongoose.config";
import crypto from "crypto";
import { Payment } from "../models/payment.model";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY as string,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// additional will be removed in future
export const handlePaymentAction = async (
  userInfo: z.infer<typeof checkoutSchema>,
  orderInfo: OrderItem[],
  additional: { total: number; totalQuantity: number },
  id: string
) => {
  const payment_capture = 1;
  const amount = additional.total * 100; // amount in paisa. In our case it's INR 1
  const currency = "INR";
  const options = {
    amount: amount.toString(),
    currency,
    payment_capture,
    notes: {
      name: userInfo.firstName,
      phone: userInfo.phone,
      email: userInfo.email,
    },
  };
  const order = await instance.orders.create(options);

  const formateOrderInfo = {
    ...userInfo,
    orderSummary: orderInfo.map((item) => ({
      ...item,
      productId: item.id,
      name: item?.product?.name,
      price: item?.product?.price,
    })),

    createdId: id,
    orderId: order.id,
  };

  await connectToDB();
  await OrderModel.create(formateOrderInfo);

  return order;
};

export const handleCheckoutAction = async (
  res: RazorpayPaymentSuccess,
  info: { createdId: string; orderId: string }
) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = res;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = await crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET as string)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    await connectToDB();
    const updateOrderPromise = OrderModel.findOneAndUpdate(
      { orderId: info.orderId },
      { paymentId: razorpay_payment_id, status: "paid" }
    );
    const createPaymentPromise = Payment.create({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      createdId: info.createdId,
    });

    // Wait for both operations to complete
    const [order, payment] = await Promise.all([
      updateOrderPromise,
      createPaymentPromise,
    ]);
    if (payment && order)
      return { message: "Payment successful", order, payment };

    return { error: "Filed to create payment" };
  }
  return { error: "Payment failed!" };
};
