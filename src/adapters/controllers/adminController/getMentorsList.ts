import { getMentors } from "../../../business/usecases/adminUseCases/getMentors";
import { Request, Response } from 'express';

export const getMentorsList = async (req:Request,res:Response) => {
    try {
      const mentorData = await getMentors();
      res.json(mentorData);
    } catch (error) {
      throw new Error("Something error happened");
    }
  };

  