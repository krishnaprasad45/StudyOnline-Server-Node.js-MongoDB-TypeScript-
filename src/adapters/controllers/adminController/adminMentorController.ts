
import { Request, Response } from 'express';
import  adminMentorManagementUseCase  from '../../../business/usecases/adminUseCases/adminMentorManagementUseCase';

export default{
    getMentorsList:async (req:Request,res:Response) => {
    try {
      const mentorData = await adminMentorManagementUseCase.getMentors();
      res.json(mentorData);
    } catch (error) {
      throw new Error("Something error happened");
    }
  },
  blockMentor: async (req: Request, res: Response) => {
    try {
        const mentorId = req.query.id as string;
        res.json(await adminMentorManagementUseCase.blockMentor(mentorId))
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
},
  verifyMentor: async (req: Request, res: Response) => {
    try {
        const mentorId = req.query.id as string;
        const status = req.query.status as string;
        res.json(await adminMentorManagementUseCase.verifyMentor(mentorId,status))
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
},
}

  