// mentorRoute.js

import express from "express";
import { upload } from "../middlewares/multer";
import { mentorSignup, mentorLogin, profile, profileUpdate } from "../../../adapters/controllers/mentorController/mentorController";
import { verifyToken } from "../middlewares/jwtTokenAuth";
import  mentorCourseController  from "../../../adapters/controllers/mentorController/mentorCourseController";
import chatUseCase from "../../../business/usecases/chat-useCase/chat-useCase";

const mentorRoute = express.Router();

mentorRoute.post("/register", upload.single("image"), mentorSignup);
mentorRoute.get("/login", mentorLogin);
mentorRoute.get("/profile", verifyToken, profile);
mentorRoute.patch("/profile/update", upload.array("images[]",3), verifyToken, profileUpdate);

mentorRoute.post("/add/course", upload.array("images[]",2), verifyToken,mentorCourseController.addCourse );
mentorRoute.get("/courses", verifyToken,mentorCourseController.getCourseList );
mentorRoute.get("/course", verifyToken,mentorCourseController.getCourse);

mentorRoute.get("/mycourses", verifyToken,mentorCourseController.getMyCourseList );
mentorRoute.patch("/edit/course",verifyToken,mentorCourseController.updateCourse);
mentorRoute.get("/edit/course", verifyToken,mentorCourseController.getMyCourseList );
mentorRoute.delete("/delete/course", verifyToken,mentorCourseController.deleteCourse );
mentorRoute.post("/unlist/course", verifyToken,mentorCourseController.unlistCourse );

mentorRoute.post("/add/chapter", upload.array("images[]",2), verifyToken,mentorCourseController.addChapter );
mentorRoute.get("/chapter/list", verifyToken,mentorCourseController.getChaptersList );
mentorRoute.get("/chapter/details", verifyToken,mentorCourseController.getChapterDetails );
mentorRoute.patch("/edit/chapter", verifyToken,mentorCourseController.updateChapter );
mentorRoute.delete("/delete/chapter", verifyToken,mentorCourseController.deleteChapter );
mentorRoute.post("/unlist/chapter", verifyToken,mentorCourseController.unlistChapter );

mentorRoute.get("/payments/history", verifyToken,mentorCourseController.getPaymentHistory );
mentorRoute.get("/chat/history", verifyToken,chatUseCase.getChatByChatId);


export default mentorRoute;
