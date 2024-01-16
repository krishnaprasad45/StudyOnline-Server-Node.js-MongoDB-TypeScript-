import ChapterInterface from "../../../business/interfaces/chapterInterface";
import CourseInterface from "../../../business/interfaces/courseInterface";
import PaymentDetails from "../../../business/interfaces/paymentDetails";
import chapterModel from "../models/chapterModel";
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
  getCourse: async (courseId:string) => {
    return await courseModel.findById(courseId)
  },
  getAllChapters: async (courseId: string): Promise<ChapterInterface[]> => {
    return await chapterModel.find({ courseId: courseId }).lean();
  },
  getChapterDetails: async (chapterId: string)=> {
    const data = await chapterModel.findById(chapterId)
    if(data) return data;
  },
  getAllHistory: async (email: string): Promise<PaymentDetails[]> => {
    return await paymentModel.find({ usedEmail: email }).lean();
  },
  getFullHistory: async (): Promise<PaymentDetails[]> => {
    return await paymentModel.find().lean();
  },
};
