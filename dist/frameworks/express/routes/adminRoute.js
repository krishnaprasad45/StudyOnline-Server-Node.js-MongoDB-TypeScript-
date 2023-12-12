"use strict";
// adminRoute.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../../../adapters/controllers/adminController");
const auth_1 = require("../middlewares/auth");
const adminRoute = express_1.default.Router();
adminRoute.post("/login", adminController_1.loginAdmin);
adminRoute.get("/loadDashboard", auth_1.verifyToken, adminController_1.loadDashboard);
exports.default = adminRoute;
