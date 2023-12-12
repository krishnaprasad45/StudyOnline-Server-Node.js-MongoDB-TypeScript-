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
exports.adminLogin = void 0;
const adminRepository_1 = require("../../../adapters/data-access/repositories/adminRepository");
const auth_1 = require("../../../frameworks/express/middlewares/auth");
function adminLogin({ email, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const adminData = yield (0, adminRepository_1.findAdmin)({ email, password });
        if (adminData.email && adminData.password === password) {
            const adminToken = (0, auth_1.generateadminToken)(adminData);
            return { adminData, adminToken };
        }
        else {
            console.log(adminData === null || adminData === void 0 ? void 0 : adminData.password, password);
            return { message: "password not match" };
        }
    });
}
exports.adminLogin = adminLogin;
module.exports = { adminLogin };
