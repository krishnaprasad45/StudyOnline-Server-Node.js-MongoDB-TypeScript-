// userRoute.js

import express from "express";
import { upload } from "../middlewares/multer";
import { userSignup, userLogin, profile, profileUpdate } from "../../../adapters/controllers/userController";
import { verifyToken } from "../middlewares/auth";
import signIn from "../../../adapters/controllers/user/userSigninController";

const userRoute = express.Router();
console.log("server-userRoute.ts")
userRoute.post("/register", upload.single("image"), userSignup);
userRoute.get("/login", userLogin);
userRoute.get("/profile", verifyToken, profile);
userRoute.post("/profile-update", upload.single("image"), verifyToken, profileUpdate);

//GoogleSignIn

userRoute.post("/google/signin", signIn.googleSignin)

export default userRoute;
