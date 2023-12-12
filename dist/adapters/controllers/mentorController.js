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
const createMentor_1 = require("../../business/usecases/mentorUseCases/createMentor");
const loginMentor_1 = require("../../business/usecases/mentorUseCases/loginMentor");
const findMentor_1 = require("../../business/usecases/mentorUseCases/findMentor");
const updateMentor_1 = require("../../business/usecases/mentorUseCases/updateMentor");
const mentorSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("mentor signup");
        console.log("req..body..", req.body);
        const { firstname, lastname, email, mobile, password, confirm_password } = req.body;
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        if (password != confirm_password) {
            return res.status(400).json({ message: 'Password mismatch' });
        }
        const mentorData = yield (0, createMentor_1.createMentor)({ firstname, lastname, email, mobile, password, image });
        console.log(mentorData);
        res.status(201).json(mentorData);
    }
    catch (error) {
        console.error(error);
        res.json(error);
    }
});
exports.mentorSignup = mentorSignup;
const mentorLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        console.log("metorController..");
        const email = (_b = req.query.email) === null || _b === void 0 ? void 0 : _b.toString();
        const password = (_c = req.query.password) === null || _c === void 0 ? void 0 : _c.toString();
        console.log(email, password);
        console.log(121);
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
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
    var _d;
    try {
        console.log("mentor profile-server");
        const email = (_d = req.query.email) === null || _d === void 0 ? void 0 : _d.toString();
        console.log(email);
        if (!email) {
            return res.status(400).json({ message: 'Something Error' });
        }
        const mentorData = yield (0, findMentor_1.findMentor)(email);
        console.log("mentordata", mentorData);
        res.json(mentorData);
    }
    catch (error) {
        throw new Error("Something error happened");
    }
});
exports.profile = profile;
const profileUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const { firstname, lastname, email, mobile, password } = req.body;
        const images = req.files;
        if (images) {
            const filenames = images.map((image) => image.filename);
            const [image, aadhar_image, experience_image] = filenames;
            const mentorEmail = (_e = req.query.mentorEmail) === null || _e === void 0 ? void 0 : _e.toString();
            if (!mentorEmail) {
                return res.status(400).json({ message: 'No email provided' });
            }
            const mentorData = yield (0, updateMentor_1.updateMentor)({
                firstname, lastname, email, mobile, image, aadhar_image, experience_image, password
            });
            res.json(mentorData);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.profileUpdate = profileUpdate;
module.exports = { mentorSignup: exports.mentorSignup, mentorLogin: exports.mentorLogin, profile: exports.profile, profileUpdate: exports.profileUpdate };
