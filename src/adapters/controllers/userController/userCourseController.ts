import courseManagementUsecases from "../../../business/usecases/courseUseCases/courseManagementUsecases";
import { Request, Response, Express } from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();

interface RequestBody {
  amount: number;
}

export default {
  getCourseList: async (req: Request, res: Response) => {
    try {
      const coursesData = await courseManagementUsecases.getCoursesList();
      res.json(coursesData);
    } catch (error) {
      console.log(error);
    }
  },

  payments: async (req: Request, res: Response) => {
    console.log("Payments");
    const { amount }: RequestBody = req.body;
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    try {
      const intent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "inr",
        automatic_payment_methods: { enabled: true },
      });

      

      res.json({ client_secret: intent.client_secret });
    } catch (error) {
      console.log(error);
    }
  },
};
