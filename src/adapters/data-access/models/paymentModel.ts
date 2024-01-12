import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  courseAmount: {
    type: Number,
  },
  courseTitle: {
    type: String,
  },
  createdBy:{
    type: String,
  },
  usedEmail: {
    type: String,
  },
  userId:{
    type:String,
  },
  type: {
    type: String,
  },
  transactionId: {
    type: Number,
  },
  cardType: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  }
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
