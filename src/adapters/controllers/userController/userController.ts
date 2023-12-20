import { userSignupInterface } from '../../../business/interfaces/userInterfaces';
import { profileUpdateInterface } from '../../../business/interfaces/userInterfaces';
import { createUser } from '../../../business/usecases/userUseCases/createUser';
import { loginUser } from '../../../business/usecases/userUseCases/loginUser';
import { findUser } from '../../../business/usecases/userUseCases/findUser';
import { updateUser } from '../../../business/usecases/userUseCases/updateUser';

import { Request, Response } from 'express'; 

export const userSignup = async (req:Request,res:Response) => {
  try {
    const { firstname,lastname, email, mobile, password , confirm_password } = req.body;
    const image = req.file?.filename; 
    if( password != confirm_password){
      return res.status(400).json({ message: 'Password mismatch' });
    }
    const userData = await createUser({firstname,lastname, email, mobile, password, image} as userSignupInterface);
    console.log(userData);
    res.status(201).json(userData);
  } catch (error) {
    console.error(error);
    res.json({ message: error as Error });
  }
};

export const userLogin = async (req:Request,res:Response) => {
  try {
    const email = req.query.email?.toString();
    const password = req.query.password?.toString();
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const response = await loginUser(email, password);
    const { userData, token } = response;
 
    res.json({ userData, token });
  } catch (error) {
   res.json(error as Error)
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const email = req.query.email?.toString();

    if (!email) {
      return res.status(400).json({ message: 'Something Error' });
    }

  
    const userData = await findUser(email);
    res.json(userData);
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const profileUpdate = async (req:Request,res:Response) => {
  try {
    
    const { firstname,lastname, email, mobile} = req.body;
    const image = req.file?.filename; 
    const oldEmail = req.query.userEmail?.toString();
    if (!oldEmail) {
      return res.status(400).json({ message: 'No email provided' });
    }
    const userData = await updateUser({firstname,lastname, email, mobile, image,oldEmail} as profileUpdateInterface);
    res.json(userData);
  } catch (error) {
    console.log(error as Error);
  }
};

module.exports = { userSignup, userLogin, profile, profileUpdate };
