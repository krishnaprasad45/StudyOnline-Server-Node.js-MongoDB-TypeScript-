import courseManagementUsecases from "../../../business/usecases/courseUseCases/courseManagementUsecases";
import { Request, Response, Express } from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import PaymentDetails from "../../../business/interfaces/paymentDetails";
dotenv.config();

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
    const paymentDetails: PaymentDetails = {
      courseAmount: req.body.amount,
      courseTitle: req.body.courseTitle,
      usedEmail: req.body.token.email,
      type: req.body.token.type,
      transactionId: req.body.token.created,
      cardType: req.body.token.card.brand,
    };

    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    try {
      const intent = await stripe.paymentIntents.create({
        amount: paymentDetails.courseAmount,
        currency: "inr",
        automatic_payment_methods: { enabled: true },
      });
      await courseManagementUsecases.savePaymentDetails({
        ...paymentDetails,
      });

      res.json({ client_secret: intent.client_secret });
    } catch (error) {
      console.log(error);
    }
  },
  getPaymentHistory: async (req: Request, res: Response) => {
    try {
      const id = req.query.id as string | undefined;
      // console.log("**id**",id)
      if (id) {
        const historyData = await courseManagementUsecases.getHistory(id);
        // console.log("his..",historyData)
        res.json(historyData);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
