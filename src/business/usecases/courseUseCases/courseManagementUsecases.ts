import courseRepository from "../../../adapters/data-access/repositories/courseRepository";
import { formatDate } from "../../../adapters/external services/moment";
import CourseInterface  from "../../interfaces/courseInterface";

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
  getCoursesList: async (): Promise<CourseInterface[]> => {
    
    try {
      const coursesData: CourseInterface[] = await courseRepository.getAllCourses();
      return coursesData;
    } catch (error) {
      console.log(error);
      // Assuming you want to return something in case of an error
      throw new Error("Error fetching courses");
    }
  },
};
