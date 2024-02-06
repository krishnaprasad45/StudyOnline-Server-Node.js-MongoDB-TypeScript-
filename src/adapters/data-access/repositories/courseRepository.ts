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
  getMyAllCourses: async (email:string) => {
    return await courseModel.find({createdby:email}).lean();
  },
  getCourse: async (courseId:string) => {
    return await courseModel.findById(courseId)
  },
  deleteCourse: async (courseId:string) => {
    return await courseModel.findByIdAndDelete(courseId)
  },
  getAllChapters: async (courseId: string): Promise<ChapterInterface[]> => {
    return await chapterModel.find({ courseId: courseId }).lean();
  },
  unlistCourse: async (courseId: string)=> {
    try {
      const course = await courseModel.findById(courseId);
      if (course) {
        course.isUnlisted = !course.isUnlisted;
        return await course.save();
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
 
  getChapterDetails: async (chapterId: string)=> {
    const data = await chapterModel.findById(chapterId)
    if(data) return data;
  },
  getAllHistory: async (email: string): Promise<PaymentDetails[]> => {
    return await paymentModel.find({ createdBy: email }).lean();
  },
  getAllHistoryForUser: async (email: string): Promise<PaymentDetails[]> => {
    return await paymentModel.find({ usedEmail: email }).lean();
  },
  getFullHistory: async (): Promise<PaymentDetails[]> => {
    return await paymentModel.find().lean();
  },
};
