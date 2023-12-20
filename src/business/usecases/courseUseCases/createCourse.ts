import { saveCourse } from "../../../adapters/data-access/repositories/courseRepository";
import { formatDate } from "../../../adapters/external services/moment";
import { addCourseInterface } from "../../interfaces/courseInterface";

export async function createCourse({ ...data }: addCourseInterface) {
  try {
    const formattedDate = await formatDate(Date.now().toString());

    const date = formattedDate;
    data.createdat = date;
    return await saveCourse({ ...data });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createCourse };
