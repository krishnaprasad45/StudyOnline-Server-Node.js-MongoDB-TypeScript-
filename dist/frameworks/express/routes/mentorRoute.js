"use strict";
// mentorRoute.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../middlewares/multer");
const mentorController_1 = require("../../../adapters/controllers/mentorController");
const auth_1 = require("../middlewares/auth");
const mentorRoute = express_1.default.Router();
mentorRoute.post("/register", multer_1.upload.single("image"), mentorController_1.mentorSignup);
mentorRoute.get("/login", mentorController_1.mentorLogin);
mentorRoute.get("/profile", auth_1.verifyToken, mentorController_1.profile);
mentorRoute.patch("/profile-update", multer_1.upload.array("images[]", 3), auth_1.verifyToken, mentorController_1.profileUpdate);
exports.default = mentorRoute;
