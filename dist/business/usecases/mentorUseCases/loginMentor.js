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
exports.loginMentor = void 0;
const mentorRepository_1 = require("../../../adapters/data-access/repositories/mentorRepository");
;
const bcrypt_1 = require("../../../adapters/external services/bcrypt");
const auth_1 = require("../../../frameworks/express/middlewares/auth");
function loginMentor(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingMentor = yield (0, mentorRepository_1.findMentorByEmail)(email);
        if (existingMentor) {
            const isMatch = yield (0, bcrypt_1.matchPassword)(password, existingMentor.password);
            if (isMatch) {
                const token = (0, auth_1.generateAuthToken)(existingMentor);
                return { mentorData: existingMentor, token };
            }
            else {
                throw new Error("Password Not Match");
            }
        }
        else {
            throw new Error("Mentor not found");
        }
    });
}
exports.loginMentor = loginMentor;
module.exports = { loginMentor };
