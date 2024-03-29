"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mentorSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    aadhar_image: {
        type: String,
    },
    experience_image: {
        type: String,
    },
    date: {
        type: String,
        required: true,
    },
    isBlock: {
        type: Boolean,
        default: false,
    },
    verification: {
        type: String,
        default: 'Pending'
    }
});
const Mentor = mongoose_1.default.model("Mentor", mentorSchema);
exports.default = Mentor;
