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
exports.deleteOne = exports.updateOne = exports.findUserByEmail = exports.saveUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
function saveUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("saveUser fn..");
            const user = new userModel_1.default(Object.assign({}, data));
            console.log("user", user);
            const result = yield user.save();
            console.log(result, "result");
            return result;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.saveUser = saveUser;
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("findUserByEmail fn..", email);
        const userData = yield userModel_1.default.findOne({ email });
        console.log("userData from findUserByEmail fn", userData);
        return userData;
    });
}
exports.findUserByEmail = findUserByEmail;
function updateOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = yield userModel_1.default.findOneAndUpdate({ email: data.oldEmail }, {
            $set: Object.assign({}, data),
        }, { new: true });
        return userData;
    });
}
exports.updateOne = updateOne;
function deleteOne(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield userModel_1.default.findByIdAndDelete(_id);
        if (response) {
            return response;
        }
        else {
            return { message: "User not found" };
        }
    });
}
exports.deleteOne = deleteOne;
module.exports = { saveUser, findUserByEmail, updateOne, deleteOne };
