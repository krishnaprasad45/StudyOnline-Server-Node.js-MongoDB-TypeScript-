import courseManagementUsecases from "../../../business/usecases/courseUseCases/courseManagementUsecases";
import { Request, Response, Express } from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import PaymentDetails from '../../../business/interfaces/paymentDetails';
import { updateMentorName } from "../../../business/usecases/userUseCases/updateUser";


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
  getCourse: async (req: Request, res: Response) => {
    try {
      const courseId = req.query.courseId as string 
      const coursesData = await courseManagementUsecases.getCourse(courseId);
      res.json(coursesData);
    } catch (error) {
      console.log(error);
    }
  },

  payments: async (req: Request, res: Response) => {
    const paymentDetails: PaymentDetails = {
      courseAmount: req.body.amount,
      courseTitle: req.body.courseTitle,
      createdBy:req.body.createdBy,
      usedEmail: req.body.token.email,
      type: req.body.token.type,
      transactionId: req.body.token.created,
      cardType: req.body.token.card.brand,
      courseId:req.body.courseId
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
      await updateMentorName(
    
        paymentDetails.createdBy,paymentDetails.usedEmail,paymentDetails.courseId
      );
      

      res.json({ client_secret: intent.client_secret });
    } catch (error) {
      console.log(error);
    }
  },
  getPaymentHistory: async (req: Request, res: Response) => {
    try {
      const email = req.query.email as string | undefined;
      console.log("**email**",email)
      if (email) {
        const historyData = await courseManagementUsecases.getHistory(email);
        console.log("his..",historyData)
        res.json(historyData);
      }
    } catch (error) {
      console.log(error);
    }
  },
  getChaptersList: async (req: Request, res: Response) => {
    try {
      const courseId = req.query.courseId as string | undefined;
      console.log("**courseId**",courseId)
      if (courseId) {
        const chapersData = await courseManagementUsecases.getChapters(courseId);
        console.log("chp..",chapersData)
        res.json(chapersData);
      }
    } catch (error) {
      console.log(error);
    }
  },
  getChapterDetails: async (req: Request, res: Response) => {
    try {
      const chapterId = req.query.chapterId as string | undefined;
      console.log("**chapterId**",chapterId)
      if (chapterId) {
        const chapersData = await courseManagementUsecases.getChapter(chapterId);
        console.log("chp..",chapersData)
        res.json(chapersData);
      }
    } catch (error) {
      console.log(error);
    }
  
},
};
