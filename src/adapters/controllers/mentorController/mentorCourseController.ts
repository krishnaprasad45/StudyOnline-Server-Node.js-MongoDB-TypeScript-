import CourseInterface  from "../../../business/interfaces/courseInterface";
import courseManagementUsecases  from "../../../business/usecases/courseUseCases/courseManagementUsecases";
import { Request, Response } from 'express';
export default { 
  addCourse : async (req:Request,res:Response) => {
    try {
      const { title,subtitle,duration,fee,createdby,description,banner,introvideo} = req.body;
      const courseData = await courseManagementUsecases.createCourse({title,subtitle,duration,description,fee,createdby,banner,introvideo} as CourseInterface);
     
      res.status(201).json(courseData);
    } catch (error) {
      console.log(error);
      res.json( error as Error );
    }
  },
  getCourseList: async (req: Request, res: Response) => {
    try {
     
      const coursesData = await courseManagementUsecases.getCoursesList(); 
      res.json(coursesData);
    } catch (error) {
      console.log(error);
    }
  }
  
}