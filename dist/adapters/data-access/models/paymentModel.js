"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    courseAmount: {
        type: Number,
    },
    courseTitle: {
        type: String,
    },
    usedEmail: {
        type: String,
    },
    userId: {
        type: String,
    },
    type: {
        type: String,
    },
    transactionId: {
        type: Number,
    },
    cardType: {
        type: String,
    },
});
const Payment = mongoose_1.default.model("Payment", paymentSchema);
exports.default = Payment;
