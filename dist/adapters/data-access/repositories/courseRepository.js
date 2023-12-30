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
const courseModel_1 = __importDefault(require("../models/courseModel"));
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
exports.default = {
    saveCourse: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const course = new courseModel_1.default(Object.assign({}, data));
        return yield course.save();
    }),
    savePayment: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const payment = new paymentModel_1.default(Object.assign({}, data));
        return yield payment.save();
    }),
    getAllCourses: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield courseModel_1.default.find().lean();
    }),
    getAllHistory: (id) => __awaiter(void 0, void 0, void 0, function* () {
        // console.log("queryid",id)
        return yield paymentModel_1.default.find({ _id: id }).lean();
    }),
};
