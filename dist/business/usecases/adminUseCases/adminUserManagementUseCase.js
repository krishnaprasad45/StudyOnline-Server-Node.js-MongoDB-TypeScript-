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
const userModel_1 = __importDefault(require("../../../adapters/data-access/models/userModel"));
const adminRepository_1 = __importDefault(require("../../../adapters/data-access/repositories/adminRepository"));
exports.default = {
    getUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userData = yield adminRepository_1.default.getAllUsers();
            return userData;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    blockUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findById(userId);
            if (user) {
                user.isBlock = !user.isBlock;
                return yield user.save();
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
};
