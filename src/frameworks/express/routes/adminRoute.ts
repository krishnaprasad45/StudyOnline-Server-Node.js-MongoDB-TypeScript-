// adminRoute.js

import express from "express";
import { upload } from "../middlewares/multer";
import { loginAdmin } from "../../../adapters/controllers/adminController/adminController";
import  adminUserController  from "../../../adapters/controllers/adminController/adminUserController";
import adminMentorController from "../../../adapters/controllers/adminController/adminMentorController";
import { verifyToken } from "../middlewares/jwtTokenAuth";
import adminPaymentController from "../../../adapters/controllers/adminController/adminPaymentController";
import adminCourseController from "../../../adapters/controllers/adminController/adminCourseController";


const adminRoute = express.Router();

adminRoute.post("/login", loginAdmin);
adminRoute.get("/getUsersList", verifyToken, adminUserController.getUsersList);
adminRoute.get("/getMentorsList", verifyToken, adminMentorController.getMentorsList);
adminRoute.get("/payments/history", verifyToken,adminPaymentController.getPaymentHistory );
adminRoute.get("/courses", verifyToken,adminCourseController.getCourseList );
adminRoute.patch("/block/user", verifyToken, adminUserController.blockUser);
adminRoute.post("/block/mentor", verifyToken, adminMentorController.blockMentor);
adminRoute.post("/mentor-verify", verifyToken, adminMentorController.verifyMentor);

export default adminRoute;
