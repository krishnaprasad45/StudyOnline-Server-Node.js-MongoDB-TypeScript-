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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUpdateUser = exports.getAllMentors = exports.getAllUsers = exports.findAdmin = void 0;
const adminModel_1 = __importDefault(require("../../data-access/models/adminModel"));
const userModel_1 = __importDefault(require("../../data-access/models/userModel"));
const mentorModel_1 = __importDefault(require("../models/mentorModel"));
function findAdmin({ email, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log();
        const adminData = yield adminModel_1.default.findOne({ email });
        return { email: "admin@gmail.com", password: "password" };
    });
}
exports.findAdmin = findAdmin;
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield userModel_1.default.find().lean();
    });
}
exports.getAllUsers = getAllUsers;
function getAllMentors() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield mentorModel_1.default.find().lean();
    });
}
exports.getAllMentors = getAllMentors;
function findUpdateUser(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = yield userModel_1.default.findById(_id);
        return userData;
    });
}
exports.findUpdateUser = findUpdateUser;
module.exports = { findAdmin, getAllUsers, findUpdateUser, getAllMentors };
