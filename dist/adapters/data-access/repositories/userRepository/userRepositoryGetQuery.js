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
const userModel_1 = __importDefault(require("../../models/userModel"));
const userRepositoryGetQuery = {
    getUserWithId: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield userModel_1.default.findById(userId);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getUser: (field, data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = {};
            query[field] = data;
            return yield userModel_1.default.find(query);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield userModel_1.default.find();
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
exports.default = userRepositoryGetQuery;
