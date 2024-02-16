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
/* eslint-disable no-mixed-spaces-and-tabs */
const nodemailer_1 = __importDefault(require("nodemailer"));
const { NODEMAILER_EMAIL, NODEMAILER_PASS } = process.env;
const sendOTPByEmail = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(email, otp, "********");
        const mailTransporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: NODEMAILER_EMAIL,
                pass: NODEMAILER_PASS
            }
        });
        const msg = `Dear user  OTP to reset your  login  is  ${otp}.Do not share this to any one`;
        const mailDetails = {
            from: NODEMAILER_EMAIL,
            to: email,
            subject: 'OTP-Verification',
            text: msg
        };
        const send = yield mailTransporter.sendMail(mailDetails);
        if (send)
            console.log('Otp send successfully');
        else
            console.log('Error in sending otp');
    }
    catch (error) {
        console.log(error, 'Error in sendig otp');
    }
});
exports.default = sendOTPByEmail;
