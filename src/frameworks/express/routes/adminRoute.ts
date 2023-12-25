// adminRoute.js

import express from "express";
import { upload } from "../middlewares/multer";
import { loginAdmin } from "../../../adapters/controllers/adminController/adminController";
import { verifyToken } from "../middlewares/jwtTokenAuth";
import  adminUserController  from "../../../adapters/controllers/adminController/adminUserController";
import adminMentorController from "../../../adapters/controllers/adminController/adminMentorController";


const adminRoute = express.Router();

adminRoute.post("/login", loginAdmin);
adminRoute.get("/getUsersList", verifyToken, adminUserController.getUsersList);
adminRoute.get("/getMentorsList", verifyToken, adminMentorController.getMentorsList);
adminRoute.patch("/block/user", verifyToken, adminUserController.blockUser);
adminRoute.post("/block/mentor", verifyToken, adminMentorController.blockMentor);
adminRoute.post("/mentor-verify", verifyToken, adminMentorController.verifyMentor);

export default adminRoute;
