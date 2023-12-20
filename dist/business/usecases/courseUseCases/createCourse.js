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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
const courseRepository_1 = require("../../../adapters/data-access/repositories/courseRepository");
const moment_1 = require("../../../adapters/external services/moment");
function createCourse(_a) {
    var data = __rest(_a, []);
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const formattedDate = yield (0, moment_1.formatDate)(Date.now().toString());
            const date = formattedDate;
            data.createdat = date;
            return yield (0, courseRepository_1.saveCourse)(Object.assign({}, data));
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.createCourse = createCourse;
module.exports = { createCourse };
