import chapterRepository from "../../../adapters/data-access/repositories/chapterRepository";
import courseRepository from "../../../adapters/data-access/repositories/courseRepository";
import { formatDate } from "../../../adapters/external services/moment";
import ChapterInterface from "../../interfaces/chapterInterface";
import CourseInterface from "../../interfaces/courseInterface";
import PaymentDetails from "../../interfaces/paymentDetails";

export default {
  createCourse: async ({ ...data }: CourseInterface) => {
    try {
      const formattedDate = await formatDate(Date.now().toString());

      const date = formattedDate;
      data.createdat = date;
      return await courseRepository.saveCourse({ ...data });
    } catch (error) {
      console.log(error);
    }
  },
  createChapter: async ({ ...data }: ChapterInterface) => {
    try {
    
      return await chapterRepository.saveChapter({ ...data });
    } catch (error) {
      console.log(error);
    }
  },
  getCoursesList: async (): Promise<CourseInterface[]> => {
    try {
      const coursesData: CourseInterface[] =
        await courseRepository.getAllCourses();
      return coursesData;
    } catch (error) {
      console.log(error);
      // Assuming you want to return something in case of an error
      throw new Error("Error fetching courses");
    }
  },
  getChapters: async (courseId:string): Promise<ChapterInterface[]> => {
    try {
      const chaptersData: ChapterInterface[] =
        await courseRepository.getAllChapters(courseId)
      return chaptersData;
    } catch (error) {
      console.log(error);
      // Assuming you want to return something in case of an error
      throw new Error("Error fetching courses");
    }
  },
  getChapter: async (chapterId:string) => {
    try {
      const chapterData =
        await courseRepository.getChapterDetails(chapterId)
      return chapterData;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching courses");
    }
  },
  savePaymentDetails: async ({ ...data }:PaymentDetails) => {
    try {
      await courseRepository.savePayment({
        ...data
      });
    } catch (error) {
      console.log(error);
      // Assuming you want to return something in case of an error
      throw new Error("Error fetching courses");
    }
  },
  getHistory: async (email:string): Promise<PaymentDetails[]> => {
    try {
      const historyData: PaymentDetails[] =
      await courseRepository.getAllHistory(email);
      return historyData;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching courses");
    }
  },
  getFullHistory: async (): Promise<PaymentDetails[]> => {
    try {
      const historyData: PaymentDetails[] =
      await courseRepository.getFullHistory();
      return historyData;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching courses");
    }
  },
};
