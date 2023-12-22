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
exports.adminLogin = void 0;
const adminRepository_1 = __importDefault(require("../../../adapters/data-access/repositories/adminRepository"));
const jwtTokenAuth_1 = require("../../../frameworks/express/middlewares/jwtTokenAuth");
function adminLogin({ email, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const adminData = yield adminRepository_1.default.findAdmin({ email, password });
        if (adminData.email && adminData.password === password) {
            const adminToken = (0, jwtTokenAuth_1.generateadminToken)(adminData);
            return { adminData, adminToken };
        }
        else {
            return { message: "password not match" };
        }
    });
}
exports.adminLogin = adminLogin;
module.exports = { adminLogin };
