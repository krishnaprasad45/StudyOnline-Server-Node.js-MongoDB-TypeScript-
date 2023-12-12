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
exports.createUser = void 0;
const userRepository_1 = require("../../../adapters/data-access/repositories/userRepository");
const bcrypt_1 = require("../../../adapters/external services/bcrypt");
const moment_1 = require("../../../adapters/external services/moment");
function createUser({ firstname, lastname, email, mobile, password, image, date }) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield (0, userRepository_1.findUserByEmail)(email);
        if (!existingUser && password) {
            const securedPassword = yield (0, bcrypt_1.securePassword)(password);
            const formattedDate = yield (0, moment_1.formatDate)(Date.now().toString());
            password = securedPassword;
            date = formattedDate;
            return yield (0, userRepository_1.saveUser)({ firstname, lastname, email, mobile, password, image, date });
        }
        else {
            throw new Error("Email already exists in the database");
        }
    });
}
exports.createUser = createUser;
module.exports = { createUser };
