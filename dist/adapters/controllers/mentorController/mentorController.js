"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileUpdate = exports.profile = exports.mentorLogin = exports.mentorSignup = void 0;
const createMentor_1 = require("../../../business/usecases/mentorUseCases/createMentor");
const loginMentor_1 = require("../../../business/usecases/mentorUseCases/loginMentor");
const findMentor_1 = require("../../../business/usecases/mentorUseCases/findMentor");
const updateMentor_1 = require("../../../business/usecases/mentorUseCases/updateMentor");
const mentorSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email, mobile, password, confirm_password, image, } = req.body;
        if (password != confirm_password) {
            return res.status(400).json({ message: "Password mismatch" });
        }
        const mentorData = yield (0, createMentor_1.createMentor)({
            firstname,
            lastname,
            email,
            mobile,
            password,
            image,
        });
        res.status(201).json(mentorData);
    }
    catch (error) {
        console.error(error);
        res.json(error);
    }
});
exports.mentorSignup = mentorSignup;
const mentorLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const email = (_a = req.query.email) === null || _a === void 0 ? void 0 : _a.toString();
        const password = (_b = req.query.password) === null || _b === void 0 ? void 0 : _b.toString();
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required." });
        }
        const response = yield (0, loginMentor_1.loginMentor)(email, password);
        const { mentorData, token } = response;
        res.json({ mentorData, token });
    }
    catch (error) {
        res.json(error);
    }
});
exports.mentorLogin = mentorLogin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const email = (_c = req.query.email) === null || _c === void 0 ? void 0 : _c.toString();
        if (!email) {
            return res.status(400).json({ message: "Something Error" });
        }
        const mentorData = yield (0, findMentor_1.findMentor)(email);
        res.json(mentorData);
    }
    catch (error) {
        throw new Error("Something error happened");
    }
});
exports.profile = profile;
const profileUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { firstname, lastname, email, mobile, password, image, aadhar_image, experience_image, } = req.body;
        const mentorEmail = (_d = req.query.mentorEmail) === null || _d === void 0 ? void 0 : _d.toString();
        if (!mentorEmail) {
            return res.status(400).json({ message: "No email provided" });
        }
        const mentorData = yield (0, updateMentor_1.updateMentor)({
            firstname,
            lastname,
            email,
            mobile,
            image,
            aadhar_image,
            experience_image,
            password,
        });
        res.json(mentorData);
    }
    catch (error) {
        console.log(error);
    }
});
exports.profileUpdate = profileUpdate;
module.exports = { mentorSignup: exports.mentorSignup, mentorLogin: exports.mentorLogin, profile: exports.profile, profileUpdate: exports.profileUpdate };
