// adminRoute.js

import express from "express";
import { upload } from "../middlewares/multer";
import { loginAdmin, loadDashboard } from "../../../adapters/controllers/adminController";
import { verifyToken } from "../middlewares/auth";

const adminRoute = express.Router();

adminRoute.post("/login", loginAdmin);
adminRoute.get("/loadDashboard",verifyToken, loadDashboard); 

export default  adminRoute;
