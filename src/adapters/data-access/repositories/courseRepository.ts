import  CourseInterface  from "../../../business/interfaces/courseInterface";
import courseModel from "../models/courseModel";

export default{
  saveCourse : async(data:CourseInterface)=> {
    const course = new courseModel({ ...data });
    return await course.save();
  },
  getAllCourses: async () => {
    
    return await courseModel.find().lean();
  },

}