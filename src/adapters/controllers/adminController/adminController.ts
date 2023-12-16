import { adminLogin } from "../../../business/usecases/adminUseCases/adminLogin";
import { getUsers } from "../../../business/usecases/adminUseCases/getUsers";

import { FlattenMaps, Types } from "mongoose";
import { Request, Response } from 'express';
export const loginAdmin = async (req:Request,res:Response) => {
  try {
    let { email, password } = req.body;
    email= 'admin@gmail.com';
    password  = 'password';
    console.log(password)
    const adminData = await adminLogin({email,password });
    res.json(adminData);
  } catch (error) {
    throw new Error("Something error happened");
  }
};

export const loadDashboard = async (req:Request,res:Response) => {
  try {
    const userData = await getUsers();
    res.json(userData);
  } catch (error) {
    throw new Error("Something error happened");
  }
};






module.exports = { loginAdmin, loadDashboard };
