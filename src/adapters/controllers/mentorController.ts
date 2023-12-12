import { createMentor } from '../../business/usecases/mentorUseCases/createMentor';
import { loginMentor } from '../../business/usecases/mentorUseCases/loginMentor';
import { findMentor } from '../../business/usecases/mentorUseCases/findMentor';
import { updateMentor } from '../../business/usecases/mentorUseCases/updateMentor';
import { Request, Response } from 'express';
import { mentorSignupInterface } from "../../business/interfaces/mentorInterfaces";
import { mentorProfile} from "../../business/interfaces/mentorInterfaces";

export const mentorSignup = async (req:Request,res:Response) => {
  try {
    console.log("mentor signup")
    console.log("req..body..",req.body)

    const { firstname,lastname, email, mobile, password , confirm_password } = req.body;
    const image = req.file?.filename;
    if( password != confirm_password){
      return res.status(400).json({ message: 'Password mismatch' });
    }
    const mentorData = await createMentor({firstname,lastname, email, mobile, password, image} as mentorSignupInterface);
    console.log(mentorData);
    res.status(201).json(mentorData);
  } catch (error) {
    console.error(error);
    res.json( error as Error );
  }
};

export const mentorLogin = async (req:Request,res:Response) => {
  try {
    console.log("metorController..");
    
    const email = req.query.email?.toString();
    const password = req.query.password?.toString();
    
    console.log(email, password);
    console.log(121);
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
    console.log("mentor profile-server")
    const email = req.query.email?.toString();
    console.log(email)
    if (!email) {
      return res.status(400).json({ message: 'Something Error' });
    }
    const mentorData = await findMentor(email);
    console.log("mentordata",mentorData)
    res.json(mentorData);
  } catch (error) {
    throw new Error("Something error happened");


  }
};

export const profileUpdate = async (req:Request,res:Response) => {
  try {
   
    const { firstname,lastname, email, mobile ,password} = req.body;
   
    const images:any= req.files;
    if(images){
    const filenames = images.map((image: { filename: string; }) => image.filename);

    const [image, aadhar_image, experience_image] = filenames;
    
  
    const mentorEmail = req.query.mentorEmail?.toString();
    if (!mentorEmail) {
      return res.status(400).json({ message: 'No email provided' });
    }
    const mentorData = await updateMentor({
      firstname, lastname, email, mobile, image, aadhar_image, experience_image,password} as mentorProfile );
    res.json(mentorData);
    }
  } catch (error) {
    console.log(error as Error);
  }
};

module.exports = { mentorSignup, mentorLogin, profile, profileUpdate };
