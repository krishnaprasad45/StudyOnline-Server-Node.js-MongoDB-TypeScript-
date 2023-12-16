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
exports.loginUser = void 0;
// import { findUserByEmail } from "../../repositories/userRepository";
const userRepository_1 = require("../../../adapters/data-access/repositories/userRepository");
const bcrypt_1 = require("../../../adapters/external services/bcrypt");
const jwtTokenAuth_1 = require("../../../frameworks/express/middlewares/jwtTokenAuth");
function loginUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield (0, userRepository_1.findUserByEmail)(email);
        if (existingUser) {
            const isMatch = yield (0, bcrypt_1.matchPassword)(password, existingUser.password);
            if (isMatch) {
                const token = (0, jwtTokenAuth_1.generateAuthToken)(existingUser);
                return { userData: existingUser, token };
            }
            else {
                throw new Error("Password Not Match");
            }
        }
        else {
            throw new Error("User not found");
        }
    });
}
exports.loginUser = loginUser;
module.exports = { loginUser };
