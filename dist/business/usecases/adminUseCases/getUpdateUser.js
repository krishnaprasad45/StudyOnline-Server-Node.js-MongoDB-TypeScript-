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
exports.getUpdateUser = void 0;
const adminRepository_1 = require("../../../adapters/data-access/repositories/adminRepository");
;
function getUpdateUser(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userData = yield (0, adminRepository_1.findUpdateUser)(_id);
        return userData;
    });
}
exports.getUpdateUser = getUpdateUser;
module.exports = { getUpdateUser };
