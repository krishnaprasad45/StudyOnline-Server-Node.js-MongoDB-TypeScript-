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
const adminMentorManagementUseCase_1 = __importDefault(require("../../../business/usecases/adminUseCases/adminMentorManagementUseCase"));
exports.default = {
    getMentorsList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const mentorData = yield adminMentorManagementUseCase_1.default.getMentors();
            res.json(mentorData);
        }
        catch (error) {
            throw new Error("Something error happened");
        }
    }),
    blockMentor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const mentorId = req.query.id;
            res.json(yield adminMentorManagementUseCase_1.default.blockMentor(mentorId));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    verifyMentor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const mentorId = req.query.id;
            const status = req.query.status;
            res.json(yield adminMentorManagementUseCase_1.default.verifyMentor(mentorId, status));
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
};
