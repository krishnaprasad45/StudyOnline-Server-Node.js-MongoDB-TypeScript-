"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateOtp = () => {
    const otp = String(Math.floor(1000 + Math.random() * 9000));
    return otp;
};
exports.default = generateOtp;
