"use strict";
// mentorRoute.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../middlewares/multer");
const mentorController_1 = require("../../../adapters/controllers/mentorController/mentorController");
const jwtTokenAuth_1 = require("../middlewares/jwtTokenAuth");
const mentorCourseController_1 = __importDefault(require("../../../adapters/controllers/mentorController/mentorCourseController"));
const mentorRoute = express_1.default.Router();
mentorRoute.post("/register", multer_1.upload.single("image"), mentorController_1.mentorSignup);
mentorRoute.get("/login", mentorController_1.mentorLogin);
mentorRoute.get("/profile", jwtTokenAuth_1.verifyToken, mentorController_1.profile);
mentorRoute.patch("/profile-update", multer_1.upload.array("images[]", 3), jwtTokenAuth_1.verifyToken, mentorController_1.profileUpdate);
// COURSE
mentorRoute.post("/add-course", multer_1.upload.array("images[]", 2), jwtTokenAuth_1.verifyToken, mentorCourseController_1.default.addCourse);
mentorRoute.get("/list-allcourses", jwtTokenAuth_1.verifyToken, mentorCourseController_1.default.getCourseList);
exports.default = mentorRoute;
