import { addCourseInterface } from "../../../business/interfaces/courseInterface";
import courseModel from "../models/courseModel";

export async function saveCourse(data:addCourseInterface) {
    const course = new courseModel({ ...data });
    console.log("course repo",course)
    return await course.save();
  }