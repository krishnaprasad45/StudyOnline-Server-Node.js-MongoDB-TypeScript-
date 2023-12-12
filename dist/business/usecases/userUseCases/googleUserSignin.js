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
const errorHandling_1 = require("../../errors/errorHandling");
const createUserFromGoogle_1 = require("./createUserFromGoogle");
const findUser_1 = require("./findUser");
exports.default = {
    googleSignin: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkEmailExists = yield (0, findUser_1.findUser)(data.email);
            console.log("checkEmailExists", checkEmailExists);
            if (checkEmailExists) {
                return true;
            }
            else {
                const saveUser = yield (0, createUserFromGoogle_1.createUserFromGoogle)({
                    name: data.name,
                    email: data.email,
                });
                return true;
            }
        }
        catch (error) {
            (0, errorHandling_1.handleError)(error);
        }
    }),
};
