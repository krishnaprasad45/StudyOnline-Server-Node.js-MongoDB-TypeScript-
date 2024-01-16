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
const courseManagementUsecases_1 = __importDefault(require("../../../business/usecases/courseUseCases/courseManagementUsecases"));
exports.default = {
    addCourse: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, subtitle, duration, fee, createdby, description, banner, introvideo } = req.body;
            const courseData = yield courseManagementUsecases_1.default.createCourse({ title, subtitle, duration, description, fee, createdby, banner, introvideo });
            res.status(201).json(courseData);
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    }),
    addChapter: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, duration, description, chaptervideo, courseId } = req.body;
            const chapterData = yield courseManagementUsecases_1.default.createChapter({ title, duration, description, chaptervideo, courseId });
            res.status(201).json(chapterData);
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    }),
    getChaptersList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseId = req.query.courseId;
            console.log("**courseId**", courseId);
            if (courseId) {
                const chapersData = yield courseManagementUsecases_1.default.getChapters(courseId);
                console.log("chp..", chapersData);
                res.json(chapersData);
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    getChapterDetails: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chapterId = req.query.chapterId;
            console.log("**chapterId**", chapterId);
            if (chapterId) {
                const chapersData = yield courseManagementUsecases_1.default.getChapter(chapterId);
                console.log("chp..", chapersData);
                res.json(chapersData);
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    getCourseList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const coursesData = yield courseManagementUsecases_1.default.getCoursesList();
            res.json(coursesData);
        }
        catch (error) {
            console.log(error);
        }
    })
};
