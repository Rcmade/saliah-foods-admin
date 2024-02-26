import mongoose, { Document, Schema } from "mongoose";

// Define payment schema interface
export interface PaymentSchema extends Document {
  orderId: string;
  paymentId: string;
  signature: string;
  createdId: mongoose.Types.ObjectId;
}

// Define payment schema
const paymentSchemaFields = {
  paymentId: { type: String, required: true },
  signature: { type: String, required: true },
  createdId: { ref: "User", type: Schema.Types.ObjectId, required: true },
  orderId: { ref: "Order", type: String, required: true },
};

const paymentSchema = new Schema<PaymentSchema>(paymentSchemaFields);

// Create and export Payment model
export const Payment =
  mongoose.models.Payment ||
  mongoose.model<PaymentSchema>("Payment", paymentSchema);
