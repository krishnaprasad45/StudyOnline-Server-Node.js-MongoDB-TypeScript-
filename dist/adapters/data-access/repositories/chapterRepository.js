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
exports.default = {
    saveChapter: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const chapter = new chapterModel_1.default(Object.assign({}, data));
        return yield chapter.save();
    }),
    updateChapter: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const chapterData = yield chapterModel_1.default.findOneAndUpdate({ _id: data.chapterId }, {
            $set: Object.assign({}, data),
        }, { new: true });
        return chapterData;
    }),
    getAllChapter: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield chapterModel_1.default.find().lean();
    }),
};
