"use strict";
// adminRoute.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../../../adapters/controllers/adminController/adminController");
const jwtTokenAuth_1 = require("../middlewares/jwtTokenAuth");
const getUsersList_1 = require("../../../adapters/controllers/adminController/getUsersList");
const getMentorsList_1 = require("../../../adapters/controllers/adminController/getMentorsList");
const adminRoute = express_1.default.Router();
adminRoute.post("/login", adminController_1.loginAdmin);
adminRoute.get("/getUsersList", jwtTokenAuth_1.verifyToken, getUsersList_1.getUsersList);
adminRoute.get("/getMentorsList", jwtTokenAuth_1.verifyToken, getMentorsList_1.getMentorsList);
exports.default = adminRoute;
