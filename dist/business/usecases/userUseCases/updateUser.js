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
exports.updateMentorName = exports.updateUser = void 0;
const userRepository_1 = require("../../../adapters/data-access/repositories/userRepository");
;
const updateUser = ({ firstname, lastname, email, mobile, image, oldEmail }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (oldEmail) {
            const existingUser = yield (0, userRepository_1.findUserByEmail)(oldEmail);
            if (existingUser) {
                const userData = yield (0, userRepository_1.updateOne)({ firstname, lastname, email, mobile, image, oldEmail });
                return userData;
            }
        }
        else {
            throw new Error("Email is undefined");
        }
    }
    catch (error) {
        throw new Error("User not found");
    }
});
exports.updateUser = updateUser;
const updateMentorName = (mentorName, email, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (email) {
            const existingUser = yield (0, userRepository_1.findUserByEmail)(email);
            if (existingUser) {
                const userData = yield (0, userRepository_1.updateMentor)(email, mentorName, courseId);
                return userData;
            }
        }
        else {
            throw new Error("Email is undefined");
        }
    }
    catch (error) {
        throw new Error("User not found");
    }
});
exports.updateMentorName = updateMentorName;
