import { addCourseInterface } from "../../../business/interfaces/courseInterface";
import { createCourse } from "../../../business/usecases/courseUseCases/createCourse";
import { createMentor } from "../../../business/usecases/mentorUseCases/createMentor";
import { Request, Response } from 'express';
export const addCourse = async (req:Request,res:Response) => {
    try {
      const { title,subtitle,duration,fee,createdby,description,banner,introvideo} = req.body;
      const courseData = await createCourse({title,subtitle,duration,description,fee,createdby,banner,introvideo} as addCourseInterface);
     
      // res.status(201).json(courseData);
    } catch (error) {
      console.log(error);
      // res.json( error as Error );
    }
  };