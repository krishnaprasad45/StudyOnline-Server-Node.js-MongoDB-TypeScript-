// userRoute.js

import express from "express";
import { userSignup, userLogin, profile, profileUpdate} from "../../../adapters/controllers/userController/userController";
import { verifyToken } from "../middlewares/jwtTokenAuth";
import signIn from "../../../adapters/controllers/userController/userSigninController";
import userCourseController from "../../../adapters/controllers/userController/userCourseController";
import chatUseCase from "../../../business/usecases/chat-useCase/chat-useCase";
const userRoute = express.Router();

userRoute.post("/signup", userSignup);
userRoute.get("/login", userLogin);
userRoute.get("/profile", verifyToken, profile);
userRoute.post("/profile/update",verifyToken, profileUpdate);
userRoute.post("/google/signin", signIn.googleSignin)
userRoute.get("/courses", verifyToken,userCourseController.getCourseList );
userRoute.get("/course", verifyToken,userCourseController.getCourse);
userRoute.post("/payments", verifyToken,userCourseController.payments );
userRoute.post("/sent/email", userCourseController.usersentEmail);
userRoute.post("/forgot/password", userCourseController.forgotPassword);
userRoute.post("/newpassword", userCourseController.newPassword);
userRoute.get("/payments/history", verifyToken,userCourseController.getPaymentHistory );
userRoute.get("/chapter/list", verifyToken,userCourseController.getChaptersList );
userRoute.get("/chapter/details", verifyToken,userCourseController.getChapterDetails );
userRoute.get("/chat/history", verifyToken,chatUseCase.getChatByChatId);




export default userRoute;
