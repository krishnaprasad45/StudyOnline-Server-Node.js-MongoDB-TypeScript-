import { addCourseInterface } from "../../../business/interfaces/courseInterface";
import courseModel from "../models/courseModel";

export async function saveCourse(data:addCourseInterface) {
    const course = new courseModel({ ...data });
    return await course.save();
  }