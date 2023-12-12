// mentorRoute.js

import express from "express";
import { upload } from "../middlewares/multer";
import { mentorSignup, mentorLogin, profile, profileUpdate } from "../../../adapters/controllers/mentorController";
import { verifyToken } from "../middlewares/auth";

const mentorRoute = express.Router();

mentorRoute.post("/register", upload.single("image"), mentorSignup);
mentorRoute.get("/login", mentorLogin);
mentorRoute.get("/profile", verifyToken, profile);
mentorRoute.patch("/profile-update", upload.array("images[]",3), verifyToken, profileUpdate);

export default mentorRoute;
