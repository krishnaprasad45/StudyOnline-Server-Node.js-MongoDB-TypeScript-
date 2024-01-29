"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const courseSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    fee: {
        type: Number,
        required: true,
    },
    createdby: {
        type: String,
    },
    createdat: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        required: true,
    },
    introvideo: {
        type: String,
        required: true,
    },
    isUnlisted: {
        type: Boolean,
        default: false,
    },
});
const Course = mongoose_1.default.model('course', courseSchema);
exports.default = Course;
