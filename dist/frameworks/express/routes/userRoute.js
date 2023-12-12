"use strict";
// userRoute.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../middlewares/multer");
const userController_1 = require("../../../adapters/controllers/userController");
const auth_1 = require("../middlewares/auth");
const userSigninController_1 = __importDefault(require("../../../adapters/controllers/user/userSigninController"));
const userRoute = express_1.default.Router();
console.log("server-userRoute.ts");
userRoute.post("/register", multer_1.upload.single("image"), userController_1.userSignup);
userRoute.get("/login", userController_1.userLogin);
userRoute.get("/profile", auth_1.verifyToken, userController_1.profile);
userRoute.post("/profile-update", multer_1.upload.single("image"), auth_1.verifyToken, userController_1.profileUpdate);
//GoogleSignIn
userRoute.post("/google/signin", userSigninController_1.default.googleSignin);
exports.default = userRoute;