// mentorRoute.js

import express from "express";
import { upload } from "../middlewares/multer";
import { mentorSignup, mentorLogin, profile, profileUpdate } from "../../../adapters/controllers/mentorController/mentorController";
import { verifyToken } from "../middlewares/jwtTokenAuth";
import  mentorCourseController  from "../../../adapters/controllers/mentorController/mentorCourseController";

const mentorRoute = express.Router();

mentorRoute.post("/register", upload.single("image"), mentorSignup);
mentorRoute.get("/login", mentorLogin);
mentorRoute.get("/profile", verifyToken, profile);
mentorRoute.patch("/profile/update", upload.array("images[]",3), verifyToken, profileUpdate);

mentorRoute.post("/add/course", upload.array("images[]",2), verifyToken,mentorCourseController.addCourse );
mentorRoute.post("/add/chapter", upload.array("images[]",2), verifyToken,mentorCourseController.addChapter );
mentorRoute.get("/courses", verifyToken,mentorCourseController.getCourseList );
mentorRoute.get("/chapter/list", verifyToken,mentorCourseController.getChaptersList );
mentorRoute.get("/chapter/details", verifyToken,mentorCourseController.getChapterDetails );

export default mentorRoute;
