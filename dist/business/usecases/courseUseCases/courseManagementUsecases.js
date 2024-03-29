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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chapterRepository_1 = __importDefault(require("../../../adapters/data-access/repositories/chapterRepository"));
const courseRepository_1 = __importDefault(require("../../../adapters/data-access/repositories/courseRepository"));
const moment_1 = require("../../../adapters/external services/moment");
exports.default = {
    createCourse: (_a) => __awaiter(void 0, void 0, void 0, function* () {
        var data = __rest(_a, []);
        try {
            const formattedDate = yield (0, moment_1.formatDate)(Date.now().toString());
            const date = formattedDate;
            data.createdat = date;
            return yield courseRepository_1.default.saveCourse(Object.assign({}, data));
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateCourse: (_b) => __awaiter(void 0, void 0, void 0, function* () {
        var data = __rest(_b, []);
        try {
            console.log("update-course", data);
            const courseData = yield courseRepository_1.default.updateCourseOne(Object.assign({}, data));
            return courseData;
        }
        catch (error) {
            throw new Error("Course not found");
        }
    }),
    createChapter: (_c) => __awaiter(void 0, void 0, void 0, function* () {
        var data = __rest(_c, []);
        try {
            return yield chapterRepository_1.default.saveChapter(Object.assign({}, data));
        }
        catch (error) {
            console.log(error);
        }
    }),
    updateChapter: (_d) => __awaiter(void 0, void 0, void 0, function* () {
        var data = __rest(_d, []);
        try {
            return yield chapterRepository_1.default.updateChapter(Object.assign({}, data));
        }
        catch (error) {
            console.log(error);
        }
    }),
    getCoursesList: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const coursesData = yield courseRepository_1.default.getAllCourses();
            return coursesData;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error fetching courses");
        }
    }),
    getMyCoursesList: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const coursesData = yield courseRepository_1.default.getMyAllCourses(email);
            return coursesData;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error fetching courses");
        }
    }),
    getChapters: (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chaptersData = yield courseRepository_1.default.getAllChapters(courseId);
            return chaptersData;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error fetching courses");
        }
    }),
    getCourse: (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield courseRepository_1.default.getCourse(courseId);
        }
        catch (error) {
            console.log(error);
            throw new Error("Error fetching courses");
        }
    }),
    deleteCourse: (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield courseRepository_1.default.deleteCourse(courseId);
            return result;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error fetching courses");
        }
    }),
    deleteChapter: (chapterId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield courseRepository_1.default.deleteChapter(chapterId);
            return result;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error fetching courses");
        }
    }),
    unlistCourse: (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield courseRepository_1.default.unlistCourse(courseId);
            return result;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error fetching courses");
        }
    }),
    unlistChapter: (chapterId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield courseRepository_1.default.unlistChapter(chapterId);
            return result;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error fetching courses");
        }
    }),
    getChapter: (chapterId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chapterData = yield courseRepository_1.default.getChapterDetails(chapterId);
            return chapterData;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error fetching courses");
        }
    }),
    savePaymentDetails: (_e) => __awaiter(void 0, void 0, void 0, function* () {
        var data = __rest(_e, []);
        try {
            yield courseRepository_1.default.savePayment(Object.assign({}, data));
        }
        catch (error) {
            console.log(error);
            throw new Error("Error fetching courses");
        }
    }),
    getHistory: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const historyData = yield courseRepository_1.default.getAllHistory(email);
            return historyData;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error fetching courses");
        }
    }),
    getHistoryForUser: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const historyData = yield courseRepository_1.default.getAllHistoryForUser(email);
            return historyData;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error fetching courses");
        }
    }),
    getFullHistory: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const historyData = yield courseRepository_1.default.getFullHistory();
            return historyData;
        }
        catch (error) {
            console.log(error);
            throw new Error("Error fetching courses");
        }
    }),
};
