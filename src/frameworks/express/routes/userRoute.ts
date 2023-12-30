// userRoute.js

import express from "express";
import { upload } from "../middlewares/multer";
import { userSignup, userLogin, profile, profileUpdate } from "../../../adapters/controllers/userController/userController";
import { verifyToken } from "../middlewares/jwtTokenAuth";
import signIn from "../../../adapters/controllers/userController/userSigninController";
import userCourseController from "../../../adapters/controllers/userController/userCourseController";
const userRoute = express.Router();

userRoute.post("/signup", upload.single("image"), userSignup);
userRoute.get("/login", userLogin);
userRoute.get("/profile", verifyToken, profile);
userRoute.post("/profile/update", upload.single("image"), verifyToken, profileUpdate);
userRoute.post("/google/signin", signIn.googleSignin)
userRoute.get("/courses", verifyToken,userCourseController.getCourseList );
userRoute.post("/payments", verifyToken,userCourseController.payments );
userRoute.get("/payments/history", verifyToken,userCourseController.getPaymentHistory );

export default userRoute;
