import courseManagementUsecases  from "../../../business/usecases/courseUseCases/courseManagementUsecases";
import { Request, Response } from 'express';
export default { 
  
  getCourseList: async (req: Request, res: Response) => {
    try {
     
      const coursesData = await courseManagementUsecases.getCoursesList(); 
      res.json(coursesData);
    } catch (error) {
      console.log(error);
    }
  }
  
}