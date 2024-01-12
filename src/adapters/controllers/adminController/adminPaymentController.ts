import courseManagementUsecases from "../../../business/usecases/courseUseCases/courseManagementUsecases";
import { Request, Response, Express } from "express";
import dotenv from "dotenv";



dotenv.config();

export default {
  
  getPaymentHistory: async (req: Request, res: Response) => {
    
    try {
        const historyData = await courseManagementUsecases.getFullHistory();
        res.json(historyData);
      
    } catch (error) {
      console.log(error);
    }
  },
};
