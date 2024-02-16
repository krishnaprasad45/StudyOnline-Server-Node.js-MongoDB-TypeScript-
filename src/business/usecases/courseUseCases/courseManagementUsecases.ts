import chapterRepository from "../../../adapters/data-access/repositories/chapterRepository";
import courseRepository from "../../../adapters/data-access/repositories/courseRepository";
import { formatDate } from "../../../adapters/external services/moment";
import ChapterInterface from "../../interfaces/chapterInterface";
import ChaptersInterface from "../../interfaces/chaptersInterface";
import CourseInterface from '../../interfaces/courseInterface';
import CoursesInterface from '../../interfaces/coursesInterface';
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
  updateCourse: async ({ ...data }: CoursesInterface) => {
    try {
        console.log("update-course",data)
        const courseData = await courseRepository.updateCourseOne({...data});
        return courseData;
      }catch (error) {
      throw new Error("Course not found");
    }
    
  },
  
  
  createChapter: async ({ ...data }: ChapterInterface) => {
    try {
      return await chapterRepository.saveChapter({ ...data });
    } catch (error) {
      console.log(error);
    }
  },
  updateChapter: async ({ ...data }: ChaptersInterface) => {
    try {
      return await chapterRepository.updateChapter({ ...data });
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
      throw new Error("Error fetching courses");
    }
  },
  getMyCoursesList: async (email: string): Promise<CourseInterface[]> => {
    try {
      const coursesData: CourseInterface[] =
        await courseRepository.getMyAllCourses(email);
      return coursesData;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching courses");
    }
  },
  getChapters: async (courseId: string): Promise<ChapterInterface[]> => {
    try {
      const chaptersData: ChapterInterface[] =
        await courseRepository.getAllChapters(courseId);
      return chaptersData;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching courses");
    }
  },
  getCourse: async (courseId: string) => {
    try {
       return await courseRepository.getCourse(courseId);
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching courses");
    }
  },
  deleteCourse: async (courseId: string) => {
    try {
      const result = await courseRepository.deleteCourse(courseId);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching courses");
    }
  },
  deleteChapter: async (chapterId: string) => {
    try {
      const result = await courseRepository.deleteChapter(chapterId);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching courses");
    }
  },
  unlistCourse: async (courseId: string) => {
    try {
      const result = await courseRepository.unlistCourse(courseId);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching courses");
    }
  },
  unlistChapter: async (chapterId: string) => {
    try {
      const result = await courseRepository.unlistChapter(chapterId);
      return result;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching courses");
    }
  },

  getChapter: async (chapterId: string) => {
    try {
      const chapterData = await courseRepository.getChapterDetails(chapterId);
      return chapterData;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching courses");
    }
  },
  savePaymentDetails: async ({ ...data }: PaymentDetails) => {
    try {
      await courseRepository.savePayment({
        ...data,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching courses");
    }
  },
  getHistory: async (email: string): Promise<PaymentDetails[]> => {
    try {
      const historyData: PaymentDetails[] =
        await courseRepository.getAllHistory(email);
      return historyData;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching courses");
    }
  },
  getHistoryForUser: async (email: string): Promise<PaymentDetails[]> => {
    try {
      const historyData: PaymentDetails[] =
        await courseRepository.getAllHistoryForUser(email);
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


