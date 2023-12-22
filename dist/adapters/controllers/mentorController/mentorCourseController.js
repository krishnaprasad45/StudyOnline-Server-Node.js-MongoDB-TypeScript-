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
exports.addCourse = void 0;
const createCourse_1 = require("../../../business/usecases/courseUseCases/createCourse");
const addCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, subtitle, duration, fee, createdby, description, banner, introvideo } = req.body;
        const courseData = yield (0, createCourse_1.createCourse)({ title, subtitle, duration, description, fee, createdby, banner, introvideo });
        // res.status(201).json(courseData);
    }
    catch (error) {
        console.log(error);
        // res.json( error as Error );
    }
});
exports.addCourse = addCourse;
