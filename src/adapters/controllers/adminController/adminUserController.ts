import { Request, Response } from 'express';
import  adminUserManagementUseCase  from "../../../business/usecases/adminUseCases/adminUserManagementUseCase";

export default{
  
 blockUser: async (req: Request, res: Response) => {
    try {
        const userId = req.query.id as string;
        res.json(await adminUserManagementUseCase.blockUser(userId))
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
},

 getUsersList : async (req:Request,res:Response) => {
    try {
      const userData = await adminUserManagementUseCase.getUsers();
      res.json(userData);
    } catch (error) {
      throw new Error("Something error happened");
    }
  }
}
  