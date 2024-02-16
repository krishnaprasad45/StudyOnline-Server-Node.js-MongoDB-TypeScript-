import courseManagementUsecases from "../../../business/usecases/courseUseCases/courseManagementUsecases";
import { Request, Response, Express } from "express";
import dotenv from "dotenv";
import PaymentDetails from "../../../business/interfaces/paymentDetails";
import { updateMentorName, updatePassword } from "../../../business/usecases/userUseCases/updateUser";
import sendOTPByEmail from "../../../business/shared/utilities/mailer";
import { findUserByEmail } from "../../data-access/repositories/userRepository";
import generateOtp from "../../../business/shared/utilities/generateOtp";

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
      const courseId = req.query.courseId as string;
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
      createdBy: req.body.createdBy,
      usedEmail: req.body.token.email,
      type: req.body.token.type,
      transactionId: req.body.token.created,
      cardType: req.body.token.card.brand,
      courseId: req.body.courseId,
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
        paymentDetails.createdBy,
        paymentDetails.usedEmail,
        paymentDetails.courseId
      );

      res.json({ client_secret: intent.client_secret });
    } catch (error) {
      console.log(error);
    }
  },
  getPaymentHistory: async (req: Request, res: Response) => {
    try {
      const email = req.query.email as string | undefined;

      if (email) {
        const historyData =
          await courseManagementUsecases.getHistoryForUser(email);
        res.json(historyData);
      }
    } catch (error) {
      console.log(error);
    }
  },
  usersentEmail: async (req: Request, res: Response) => {
    try {
      const email = req.body.email;
      const otp = req.body.otp;
      sendOTPByEmail(email, otp);

      res.json({ email });
    } catch (error) {
      res.json(error as Error);
    }
  },
  forgotPassword: async (req: Request, res: Response) => {
    try {
      const email = req.body.email;
      const existingUser: any = await findUserByEmail(email);
      if (existingUser) {
        const otp = generateOtp();
        console.log("forgot pass", email, otp);
        sendOTPByEmail(email, otp);
        res.status(200).json({ otp });
      }
      if(!existingUser){
        res.status(409).json({ error: 'Conflict - Email already exists' });

      }
    } catch (error) {
      res.json(error as Error);
    }
  },
  newPassword : async (req: Request, res: Response) => {
    try {
      const email:string = req.body.email;
      const newPassword:string | undefined = req.body.newPassword;
      console.log("email,new",email,newPassword)
    
      
      const userData = await updatePassword(
        newPassword,
        email
       
       );
      res.status(201).json(userData);
    } 
  
    catch (error) {
      console.log(error);
    }
  
  },
  getChaptersList: async (req: Request, res: Response) => {
    try {
      const courseId = req.query.courseId as string | undefined;
      if (courseId) {
        const chapersData =
          await courseManagementUsecases.getChapters(courseId);
        res.json(chapersData);
      }
    } catch (error) {
      console.log(error);
    }
  },
  getChapterDetails: async (req: Request, res: Response) => {
    try {
      const chapterId = req.query.chapterId as string | undefined;
      if (chapterId) {
        const chapersData =
          await courseManagementUsecases.getChapter(chapterId);
        res.json(chapersData);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
