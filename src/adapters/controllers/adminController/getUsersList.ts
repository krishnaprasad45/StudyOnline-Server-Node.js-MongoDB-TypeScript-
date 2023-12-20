import { getUsers } from "../../../business/usecases/adminUseCases/getUsers";
import { Request, Response } from 'express';

export const getUsersList = async (req:Request,res:Response) => {
    try {
      const userData = await getUsers();
      res.json(userData);
    } catch (error) {
      throw new Error("Something error happened");
    }
  };
  