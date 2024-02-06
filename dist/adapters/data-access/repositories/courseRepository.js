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
const chapterModel_1 = __importDefault(require("../models/chapterModel"));
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
    getMyAllCourses: (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield courseModel_1.default.find({ createdby: email }).lean();
    }),
    getCourse: (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield courseModel_1.default.findById(courseId);
    }),
    deleteCourse: (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield courseModel_1.default.findByIdAndDelete(courseId);
    }),
    getAllChapters: (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield chapterModel_1.default.find({ courseId: courseId }).lean();
    }),
    unlistCourse: (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const course = yield courseModel_1.default.findById(courseId);
            if (course) {
                course.isUnlisted = !course.isUnlisted;
                return yield course.save();
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    unlistChapter: (chapterId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chapter = yield chapterModel_1.default.findById(chapterId);
            if (chapter) {
                chapter.isUnlisted = !chapter.isUnlisted;
                return yield chapter.save();
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }),
    getChapterDetails: (chapterId) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield chapterModel_1.default.findById(chapterId);
        if (data)
            return data;
    }),
    getAllHistory: (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield paymentModel_1.default.find({ createdBy: email }).lean();
    }),
    getAllHistoryForUser: (email) => __awaiter(void 0, void 0, void 0, function* () {
        return yield paymentModel_1.default.find({ usedEmail: email }).lean();
    }),
    getFullHistory: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield paymentModel_1.default.find().lean();
    }),
};
