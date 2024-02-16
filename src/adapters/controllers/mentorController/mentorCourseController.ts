import ChapterInterface from "../../../business/interfaces/chapterInterface";
import ChaptersInterface from "../../../business/interfaces/chaptersInterface";
import CourseInterface from "../../../business/interfaces/coursesInterface";
import CoursesInterface from "../../../business/interfaces/coursesInterface";
import courseManagementUsecases from "../../../business/usecases/courseUseCases/courseManagementUsecases";
import { Request, Response } from "express";
export default {
  addCourse: async (req: Request, res: Response) => {
    try {
      const {
        title,
        subtitle,
        duration,
        fee,
        createdby,
        description,
        banner,
        introvideo,
      } = req.body;
      const courseData = await courseManagementUsecases.createCourse({
        title,
        subtitle,
        duration,
        description,
        fee,
        createdby,
        banner,
        introvideo,
      } as CourseInterface);

      res.status(201).json(courseData);
    } catch (error) {
      console.log(error);
      res.json(error as Error);
    }
  },
  updateCourse: async (req: Request, res: Response) => {
    try {
      const {
        courseId,
        title,
        subtitle,
        duration,
        fee,
        createdby,
        description,
        banner,
        introvideo,
      } = req.body;
      const courseData = await courseManagementUsecases.updateCourse({
        courseId,
        title,
        subtitle,
        duration,
        description,
        fee,
        createdby,
        banner,
        introvideo,
      } as CoursesInterface);

      res.status(201).json(courseData);
    } catch (error) {
      console.log(error);
      res.json(error as Error);
    }
  },
  addChapter: async (req: Request, res: Response) => {
    try {
      const { title, duration, description, chaptervideo, courseId } = req.body;
     
      const chapterData = await courseManagementUsecases.createChapter({
        title,
        duration,
        description,
        chaptervideo,
        courseId,
      } as ChapterInterface);

      res.status(201).json(chapterData);
    } catch (error) {
      console.log(error);
      res.json(error as Error);
    }
  },
  updateChapter: async (req: Request, res: Response) => {
    try {
      const {chapterId, title, duration, description, chaptervideo, courseId } = req.body;
     
      const chapterData = await courseManagementUsecases.updateChapter({
        chapterId,
        title,
        duration,
        description,
        chaptervideo,
        courseId,
      } as ChaptersInterface);

      res.status(201).json(chapterData);
    } catch (error) {
      console.log(error);
      res.json(error as Error);
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
  getPaymentHistory: async (req: Request, res: Response) => {
    try {
      const email = req.query.email as string | undefined;
      if (email) {
        const historyData = await courseManagementUsecases.getHistory(email);
        res.json(historyData);
      }
    } catch (error) {
      console.log(error);
    }
  },
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
  deleteCourse: async (req: Request, res: Response) => {
    try {
      const courseId = req.query.courseId as string 
      const coursesData = await courseManagementUsecases.deleteCourse(courseId);
      res.status(201).json(coursesData);
    } catch (error) {
      console.log(error);
    }
  },
  deleteChapter: async (req: Request, res: Response) => {
    try {
      const chapterId = req.query.chapterId as string 
      const chapterData = await courseManagementUsecases.deleteChapter(chapterId);
      res.status(201).json(chapterData);
    } catch (error) {
      console.log(error);
    }
  },
  unlistCourse: async (req: Request, res: Response) => {
    try {
      const courseId = req.query.courseId as string 
      const coursesData = await courseManagementUsecases.unlistCourse(courseId);
      res.status(201).json(coursesData);
    } catch (error) {
      console.log(error);
    }
  },
  unlistChapter: async (req: Request, res: Response) => {
    try {
      const chapterId = req.query.chapterId as string 
      const chapterData = await courseManagementUsecases.unlistChapter(chapterId);
      res.status(201).json(chapterData);
    } catch (error) {
      console.log(error);
    }
  },
  getMyCourseList: async (req: Request, res: Response) => {
    try {
      const email = req.query.email as string | undefined;
      if(email){
      const coursesData = await courseManagementUsecases.getMyCoursesList(email);
      res.json(coursesData);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
