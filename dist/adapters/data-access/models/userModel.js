"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    password: {
        type: String,
    },
    image: {
        type: String,
    },
    date: {
        type: String,
    },
    block: {
        type: Boolean,
        default: false,
    },
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
