import Jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { userSignupInterface } from '../../../business/interfaces/userInterfaces';
import { mentorSignupInterface } from '../../../business/interfaces/mentorInterfaces';
import { adminSigninInterface } from '../../../business/interfaces/adminInterfaces';
// dotenv.ts
import * as dotenv from 'dotenv';
dotenv.config();

export function generateAuthToken(existingUser:userSignupInterface) {
  const { _id, firstname,lastname, email, mobile, image } = existingUser;
  const jwtSecretKey = process.env.JWT_SECRETKEY || '';
  const token = Jwt.sign({ _id, firstname,lastname, email, mobile, image }, jwtSecretKey);
  return token;
}
function generateMentorAuthToken(existingMentor:mentorSignupInterface) {
  const { _id, firstname,lastname, email, mobile, image } = existingMentor;
  const jwtSecretKey = process.env.JWT_SECRETKEY || '';
  const token = Jwt.sign({ _id, firstname,lastname, email, mobile, image }, jwtSecretKey);
  return token;
}

export function generateadminToken(adminData:adminSigninInterface) {
  const { email } = adminData;
   const jwtSecretKey = process.env.JWT_SECRETKEY || '';
  const token = Jwt.sign({ email }, jwtSecretKey);
  return token;
}



interface CustomHeaders extends Record<string, string | string[] | undefined> {
  authorization?: string;
}

export async function verifyToken(req: Request<{}, {}, {}, CustomHeaders>, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader, "authHeader");
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token, "token");

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

     const jwtSecretKey = process.env.JWT_SECRETKEY || '';

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Invalid token' });
  }
}


module.exports = { generateAuthToken,generateMentorAuthToken, generateadminToken, verifyToken };
