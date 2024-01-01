import CourseInterface from "../../../business/interfaces/courseInterface";
import PaymentDetails from "../../../business/interfaces/paymentDetails";
import courseModel from "../models/courseModel";
import paymentModel from "../models/paymentModel";

export default {
  saveCourse: async (data: CourseInterface) => {
    const course = new courseModel({ ...data });
    return await course.save();
  },
  savePayment: async (data: PaymentDetails) => {
    const payment = new paymentModel({ ...data });
    return await payment.save();
  },
  getAllCourses: async () => {
    return await courseModel.find().lean();
  },
  getAllHistory: async (email: string): Promise<PaymentDetails[]> => {
    return await paymentModel.find({ usedEmail: email }).lean();
  },
};
