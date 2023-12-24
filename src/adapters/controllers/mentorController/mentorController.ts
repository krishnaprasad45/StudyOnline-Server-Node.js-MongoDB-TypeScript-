import { createMentor } from '../../../business/usecases/mentorUseCases/createMentor';
import { loginMentor } from '../../../business/usecases/mentorUseCases/loginMentor';
import { findMentor } from '../../../business/usecases/mentorUseCases/findMentor';
import { updateMentor } from '../../../business/usecases/mentorUseCases/updateMentor';
import { Request, Response } from 'express';
import { mentorSignupInterface } from "../../../business/interfaces/mentorInterfaces";
import { mentorProfile} from "../../../business/interfaces/mentorInterfaces";

export const mentorSignup = async (req:Request,res:Response) => {
  try {
    console.log("bpdy",req.body)
    const { firstname,lastname, email, mobile, password , confirm_password,image } = req.body;
    if( password != confirm_password){
      return res.status(400).json({ message: 'Password mismatch' });
    }
    const mentorData = await createMentor({firstname,lastname, email, mobile, password, image} as mentorSignupInterface);
 
    res.status(201).json(mentorData);
  } catch (error) {
    console.error(error);
    res.json( error as Error );
  }
};

export const mentorLogin = async (req:Request,res:Response) => {
  try {
   
    
    const email = req.query.email?.toString();
    const password = req.query.password?.toString();
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const response = await loginMentor(email, password);
    const { mentorData, token } = response;
    res.json({ mentorData, token });
  } catch (error) {
   res.json(error as Error)
  }
};

export const profile = async (req:Request,res:Response) => {
  try {
   
    const email = req.query.email?.toString();
    
    if (!email) {
      return res.status(400).json({ message: 'Something Error' });
    }
    const mentorData = await findMentor(email);
   
    res.json(mentorData);
  } catch (error) {
    throw new Error("Something error happened");


  }
};

export const profileUpdate = async (req:Request,res:Response) => {
  try {
    console.log("by",req.body)
   
    const { firstname,lastname, email, mobile ,password,images} = req.body;
   
   
    if(images){

    const [image, aadhar_image, experience_image] = [...images];
    
  
    const mentorEmail = req.query.mentorEmail?.toString();
    if (!mentorEmail) {
      return res.status(400).json({ message: 'No email provided' });
    }
    const mentorData = await updateMentor({
      firstname, lastname, email, mobile, image, aadhar_image, experience_image,password} as mentorProfile );
    res.json(mentorData);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { mentorSignup, mentorLogin, profile, profileUpdate };
