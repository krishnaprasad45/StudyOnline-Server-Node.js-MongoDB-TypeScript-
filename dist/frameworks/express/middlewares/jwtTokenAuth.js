"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRole = exports.verifyToken = exports.generateadminToken = exports.generateMentorAuthToken = exports.generateAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// dotenv.ts
const dotenv = __importStar(require("dotenv"));
const encryptionDecryption_1 = __importDefault(require("../../../business/shared/utilities/encryptionDecryption"));
dotenv.config();
function generateAuthToken(existingUser) {
    const { _id, firstname, lastname, email, mobile, image } = existingUser;
    const jwtSecretKey = process.env.JWT_SECRETKEY || "";
    const token = jsonwebtoken_1.default.sign({ _id, firstname, lastname, email, mobile, image, role: "user" }, jwtSecretKey);
    return token;
}
exports.generateAuthToken = generateAuthToken;
function generateMentorAuthToken(existingMentor) {
    const { _id, firstname, lastname, email, mobile, image } = existingMentor;
    const jwtSecretKey = process.env.JWT_SECRETKEY || "";
    const token = jsonwebtoken_1.default.sign({ _id, firstname, lastname, email, mobile, image, role: "mentor" }, jwtSecretKey);
    return token;
}
exports.generateMentorAuthToken = generateMentorAuthToken;
function generateadminToken(adminData) {
    const { email } = adminData;
    const jwtSecretKey = process.env.JWT_SECRETKEY || "";
    const token = jsonwebtoken_1.default.sign({ email, role: "admin" }, jwtSecretKey);
    return token;
}
exports.generateadminToken = generateadminToken;
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(" ")[1];
            if (!token) {
                return res.status(401).json({ error: "No token provided" });
            }
            const jwtSecretKey = process.env.JWT_SECRETKEY || "";
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).json({ error: "Invalid token" });
        }
    });
}
exports.verifyToken = verifyToken;
function validateRole(req, res, next) {
    try {
        const requestedRoute = req.path;
        console.log("path...++ :", requestedRoute);
        const publicRoutes = [
            /**********  User **********/
            "/",
            "/login",
            "/register",
            "/google/signin",
            /**********  Mentor **********/
            "/mentor/home",
            "/mentor/signup",
            "/mentor/register",
            "/mentor/login",
            /**********  Admin **********/
            "/admin/dashboard",
            "/admin/login",
        ];
        if (publicRoutes.includes(requestedRoute)) {
            return next();
        }
        const authorizationHeader = req.header("Authorization");
        console.log("authorizationHeader++", authorizationHeader);
        if (!authorizationHeader) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const token = authorizationHeader.replace("Bearer ", "");
        const decodedToken = encryptionDecryption_1.default.decryptdata(token);
        console.log("decodedToken++", decodedToken);
        const userRouteSegment = "/";
        const mentorRouteSegment = "/mentor";
        const adminRouteSegment = "/admin";
        let validRole = false;
        if (requestedRoute.startsWith(userRouteSegment) &&
            decodedToken.role === "user") {
            validRole = true;
        }
        else if (requestedRoute.startsWith(mentorRouteSegment) &&
            decodedToken.role === "mentor") {
            validRole = true;
        }
        else if (requestedRoute.startsWith(adminRouteSegment) &&
            decodedToken.role === "admin") {
            validRole = true;
        }
        if (validRole) {
            req.token = decodedToken;
            next();
        }
        else {
            return res.status(401).json({ error: "Unauthorized" });
        }
    }
    catch (error) {
        console.log("error in jwt ", error);
        return res.status(401).json({ error: error.message });
    }
}
exports.validateRole = validateRole;
module.exports = {
    generateAuthToken,
    generateMentorAuthToken,
    generateadminToken,
    verifyToken,
    validateRole,
};
