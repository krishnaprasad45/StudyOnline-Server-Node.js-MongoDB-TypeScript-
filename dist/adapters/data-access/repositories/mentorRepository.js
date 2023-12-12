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
exports.updateOne = exports.findMentorByEmail = exports.saveMentor = void 0;
const mentorModel_1 = __importDefault(require("../models/mentorModel"));
function saveMentor(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const mentor = new mentorModel_1.default(Object.assign({}, data));
        console.log("mentor repo");
        return yield mentor.save();
    });
}
exports.saveMentor = saveMentor;
function findMentorByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("findMentorByEmail");
        console.log(email);
        const mentorData = yield mentorModel_1.default.findOne({ email });
        console.log(mentorData);
        return mentorData;
    });
}
exports.findMentorByEmail = findMentorByEmail;
function updateOne(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const mentorData = yield mentorModel_1.default.findOneAndUpdate({ email: data.email }, {
            $set: Object.assign({}, data),
        }, { new: true });
        return mentorData;
    });
}
exports.updateOne = updateOne;
function deleteOne(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield mentorModel_1.default.findByIdAndDelete(_id);
        if (response) {
            return response;
        }
        else {
            return { message: "Mentor not found" };
        }
    });
}
module.exports = { saveMentor, findMentorByEmail, updateOne, deleteOne };
