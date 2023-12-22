// userRoute.js

import express from "express";
import { upload } from "../middlewares/multer";
import { userSignup, userLogin, profile, profileUpdate } from "../../../adapters/controllers/userController/userController";
import { verifyToken } from "../middlewares/jwtTokenAuth";
import signIn from "../../../adapters/controllers/userController/userSigninController";

const userRoute = express.Router();
userRoute.post("/register", upload.single("image"), userSignup);
userRoute.get("/login", userLogin);
userRoute.get("/profile", verifyToken, profile);
userRoute.post("/profile-update", upload.single("image"), verifyToken, profileUpdate);

//GoogleSignIn

userRoute.post("/google/signin",verifyToken, signIn.googleSignin)

export default userRoute;
