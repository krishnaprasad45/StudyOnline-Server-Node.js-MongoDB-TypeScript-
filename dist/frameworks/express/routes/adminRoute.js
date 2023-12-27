"use strict";
// adminRoute.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../../../adapters/controllers/adminController/adminController");
const adminUserController_1 = __importDefault(require("../../../adapters/controllers/adminController/adminUserController"));
const adminMentorController_1 = __importDefault(require("../../../adapters/controllers/adminController/adminMentorController"));
const jwtTokenAuth_1 = require("../middlewares/jwtTokenAuth");
const adminRoute = express_1.default.Router();
adminRoute.post("/login", adminController_1.loginAdmin);
adminRoute.get("/getUsersList", jwtTokenAuth_1.verifyToken, adminUserController_1.default.getUsersList);
adminRoute.get("/getMentorsList", jwtTokenAuth_1.verifyToken, adminMentorController_1.default.getMentorsList);
adminRoute.patch("/block/user", jwtTokenAuth_1.verifyToken, adminUserController_1.default.blockUser);
adminRoute.post("/block/mentor", jwtTokenAuth_1.verifyToken, adminMentorController_1.default.blockMentor);
adminRoute.post("/mentor-verify", jwtTokenAuth_1.verifyToken, adminMentorController_1.default.verifyMentor);
exports.default = adminRoute;
