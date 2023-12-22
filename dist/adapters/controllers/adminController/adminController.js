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
exports.loginAdmin = void 0;
const adminManagementUseCase_1 = require("../../../business/usecases/adminUseCases/adminManagementUseCase");
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password } = req.body;
        email = 'admin@gmail.com';
        password = 'password';
        const adminData = yield (0, adminManagementUseCase_1.adminLogin)({ email, password });
        res.json(adminData);
    }
    catch (error) {
        // throw new Error(error as string);
        throw new Error("Something error happened");
    }
});
exports.loginAdmin = loginAdmin;
module.exports = { loginAdmin: exports.loginAdmin };
