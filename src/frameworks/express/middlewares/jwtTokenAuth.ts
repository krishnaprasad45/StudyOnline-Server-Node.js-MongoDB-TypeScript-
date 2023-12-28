import Jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { userSignupInterface } from "../../../business/interfaces/userInterfaces";
import { mentorSignupInterface } from "../../../business/interfaces/mentorInterfaces";
import { adminSigninInterface } from "../../../business/interfaces/adminInterfaces";

// dotenv.ts
import * as dotenv from "dotenv";
import encryptionDecryption from "../../../business/shared/utilities/encryptionDecryption";
dotenv.config();

export function generateAuthToken(existingUser: userSignupInterface) {
  const { _id, firstname, lastname, email, mobile, image } = existingUser;
  const jwtSecretKey = process.env.JWT_SECRETKEY || "";
  const token = Jwt.sign(
    { _id, firstname, lastname, email, mobile, image, role: "user" },
    jwtSecretKey
  );
  return token;
}
export function generateMentorAuthToken(existingMentor: mentorSignupInterface) {
  const { _id, firstname, lastname, email, mobile, image } = existingMentor;
  const jwtSecretKey = process.env.JWT_SECRETKEY || "";
  const token = Jwt.sign(
    { _id, firstname, lastname, email, mobile, image, role: "mentor" },
    jwtSecretKey
  );
  return token;
}

export function generateadminToken(adminData: adminSigninInterface) {
  const { email } = adminData;
  const jwtSecretKey = process.env.JWT_SECRETKEY || "";
  const token = Jwt.sign({ email, role: "admin" }, jwtSecretKey);
  return token;
}

interface CustomHeaders extends Record<string, string | string[] | undefined> {
  authorization?: string;
}

export async function verifyToken(

  req: Request<{}, {}, {}, CustomHeaders>,
  res: Response,
  next: NextFunction
) {
  try {
   
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      console.log("token verification failed");
      return res.status(401).json({ error: "No token provided" });
    }

    const jwtSecretKey = process.env.JWT_SECRETKEY || "";

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
}

export function validateRole(req: Request, res: Response, next: NextFunction) {
  try {

    const requestedRoute = req.path;

   
    const publicRoutes = [
      /**********  User **********/
      "/",
      "/login",
      "/signup",
      "/google/signin",
      /**********  Mentor **********/
      "/mentor/home",
      "/mentor/signup",
      "/mentor/register",
      "/mentor/login",
      /**********  Admin **********/
      // "/admin/dashboard",
      "/admin/login",
     
    ];

    if (publicRoutes.includes(requestedRoute)) {
      return next();
    }
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader) {
      console.log("Unauthorized!!");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authorizationHeader.replace("Bearer ", "");
    const decodedToken = encryptionDecryption.decryptdata(token);

    const userRouteSegment = "/";
    const mentorRouteSegment = "/mentor";
    const adminRouteSegment = "/admin";
    let validRole = false;
    if (
      requestedRoute.startsWith(userRouteSegment) &&
      decodedToken.role === "user"
    ) {
      validRole = true;
    } else if (
      requestedRoute.startsWith(mentorRouteSegment) &&
      decodedToken.role === "mentor"
    ) {
      validRole = true;
    } else if (
      requestedRoute.startsWith(adminRouteSegment) &&
      decodedToken.role === "admin"
    ) {
      validRole = true;
    }

    if (validRole) {
      req.token = decodedToken;
      next();
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    // return res.status(401).json({ error: (error as Error).message });
  }
}

module.exports = {
  generateAuthToken,
  generateMentorAuthToken,
  generateadminToken,
  verifyToken,
  validateRole,
};
