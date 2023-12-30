import mongoose from "mongoose";
import { ObjectId } from 'mongoose';

const paymentSchema = new mongoose.Schema({
  courseAmount: {
    type: Number,
  },
  courseTitle: {
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
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
