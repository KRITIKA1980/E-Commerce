import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  productId: Number,
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: Number,
  customerName: String,
  whatsappNumber: String,
  screenshotUrl: String, // URL or filename stored
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Payment", paymentSchema);