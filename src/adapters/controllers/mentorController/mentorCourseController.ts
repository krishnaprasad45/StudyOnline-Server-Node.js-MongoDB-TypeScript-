import { addCourseInterface } from "../../../business/interfaces/courseInterface";
import { createCourse } from "../../../business/usecases/courseUseCases/createCourse";
import { createMentor } from "../../../business/usecases/mentorUseCases/createMentor";
import { Request, Response } from 'express';
export const addCourse = async (req:Request,res:Response) => {
    try {
      console.log("addCourse fun")
      console.log("req..body..",req.body)
  
      const { title,subtitle,duration,fee,createdby,description,banner,introvideo} = req.body;
    
      const courseData = await createCourse({title,subtitle,duration,description,fee,createdby,banner,introvideo} as addCourseInterface);
      console.log(courseData);
      // res.status(201).json(courseData);
    } catch (error) {
      console.error(error);
      // res.json( error as Error );
    }
  };