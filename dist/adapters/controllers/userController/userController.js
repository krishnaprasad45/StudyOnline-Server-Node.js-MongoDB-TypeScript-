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
exports.profileUpdate = exports.profile = exports.userLogin = exports.userSignup = void 0;
const createUser_1 = require("../../../business/usecases/userUseCases/createUser");
const loginUser_1 = require("../../../business/usecases/userUseCases/loginUser");
const findUser_1 = require("../../../business/usecases/userUseCases/findUser");
const updateUser_1 = require("../../../business/usecases/userUseCases/updateUser");
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email, mobile, password, confirm_password, image, } = req.body;
        if (password != confirm_password) {
            return res.status(400).json({ message: "Password mismatch" });
        }
        const userData = yield (0, createUser_1.createUser)({
            firstname,
            lastname,
            email,
            mobile,
            password,
            image,
        });
        res.status(201).json(userData);
    }
    catch (error) {
        console.error(error);
        res.json({ message: error });
    }
});
exports.userSignup = userSignup;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const email = (_a = req.query.email) === null || _a === void 0 ? void 0 : _a.toString();
        const password = (_b = req.query.password) === null || _b === void 0 ? void 0 : _b.toString();
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required." });
        }
        const response = yield (0, loginUser_1.loginUser)(email, password);
        const { userData, token } = response;
        res.json({ userData, token });
    }
    catch (error) {
        res.json(error);
    }
});
exports.userLogin = userLogin;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const email = (_c = req.query.email) === null || _c === void 0 ? void 0 : _c.toString();
        if (!email) {
            return res.status(400).json({ message: "Something Error" });
        }
        const userData = yield (0, findUser_1.findUser)(email);
        res.json(userData);
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.profile = profile;
const profileUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    try {
        const { firstname, lastname, email, mobile } = req.body;
        const image = (_d = req.file) === null || _d === void 0 ? void 0 : _d.filename;
        const oldEmail = (_e = req.query.userEmail) === null || _e === void 0 ? void 0 : _e.toString();
        if (!oldEmail) {
            return res.status(400).json({ message: "No email provided" });
        }
        const userData = yield (0, updateUser_1.updateUser)({
            firstname,
            lastname,
            email,
            mobile,
            image,
            oldEmail,
        });
        res.json(userData);
    }
    catch (error) {
        console.log(error);
    }
});
exports.profileUpdate = profileUpdate;
module.exports = { userSignup: exports.userSignup, userLogin: exports.userLogin, profile: exports.profile, profileUpdate: exports.profileUpdate };
