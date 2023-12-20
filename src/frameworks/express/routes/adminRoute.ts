// adminRoute.js

import express from "express";
import { upload } from "../middlewares/multer";
import { loginAdmin } from "../../../adapters/controllers/adminController/adminController";
import { verifyToken } from "../middlewares/jwtTokenAuth";
import { getUsersList } from "../../../adapters/controllers/adminController/getUsersList";
import { getMentorsList } from "../../../adapters/controllers/adminController/getMentorsList";

const adminRoute = express.Router();

adminRoute.post("/login", loginAdmin);
adminRoute.get("/getUsersList",verifyToken, getUsersList); 
adminRoute.get("/getMentorsList",verifyToken, getMentorsList); 

export default  adminRoute;
