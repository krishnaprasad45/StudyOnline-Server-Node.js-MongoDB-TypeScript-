import { adminLogin } from "../../../business/usecases/adminUseCases/adminManagementUseCase";
import { Request, Response } from 'express';
export const loginAdmin = async (req:Request,res:Response) => {
  try {
    let { email, password } = req.body;
    email= 'admin@gmail.com';
    password  = 'password';
    
    const adminData = await adminLogin({email,password });
    res.json(adminData);
  } catch (error) {
    // throw new Error(error as string);
    throw new Error("Something error happened");
  }
};







module.exports = { loginAdmin };
