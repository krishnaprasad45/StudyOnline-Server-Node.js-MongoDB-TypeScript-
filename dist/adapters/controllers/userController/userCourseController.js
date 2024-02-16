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
const courseManagementUsecases_1 = __importDefault(require("../../../business/usecases/courseUseCases/courseManagementUsecases"));
const dotenv_1 = __importDefault(require("dotenv"));
const updateUser_1 = require("../../../business/usecases/userUseCases/updateUser");
const mailer_1 = __importDefault(require("../../../business/shared/utilities/mailer"));
const userRepository_1 = require("../../data-access/repositories/userRepository");
const generateOtp_1 = __importDefault(require("../../../business/shared/utilities/generateOtp"));
dotenv_1.default.config();
exports.default = {
    getCourseList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const coursesData = yield courseManagementUsecases_1.default.getCoursesList();
            res.json(coursesData);
        }
        catch (error) {
            console.log(error);
        }
    }),
    getCourse: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseId = req.query.courseId;
            const coursesData = yield courseManagementUsecases_1.default.getCourse(courseId);
            res.json(coursesData);
        }
        catch (error) {
            console.log(error);
        }
    }),
    payments: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const paymentDetails = {
            courseAmount: req.body.amount,
            courseTitle: req.body.courseTitle,
            createdBy: req.body.createdBy,
            usedEmail: req.body.token.email,
            type: req.body.token.type,
            transactionId: req.body.token.created,
            cardType: req.body.token.card.brand,
            courseId: req.body.courseId,
        };
        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
        try {
            const intent = yield stripe.paymentIntents.create({
                amount: paymentDetails.courseAmount,
                currency: "inr",
                automatic_payment_methods: { enabled: true },
            });
            yield courseManagementUsecases_1.default.savePaymentDetails(Object.assign({}, paymentDetails));
            yield (0, updateUser_1.updateMentorName)(paymentDetails.createdBy, paymentDetails.usedEmail, paymentDetails.courseId);
            res.json({ client_secret: intent.client_secret });
        }
        catch (error) {
            console.log(error);
        }
    }),
    getPaymentHistory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const email = req.query.email;
            if (email) {
                const historyData = yield courseManagementUsecases_1.default.getHistoryForUser(email);
                res.json(historyData);
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    usersentEmail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const email = req.body.email;
            const otp = req.body.otp;
            (0, mailer_1.default)(email, otp);
            res.json({ email });
        }
        catch (error) {
            res.json(error);
        }
    }),
    forgotPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const email = req.body.email;
            const existingUser = yield (0, userRepository_1.findUserByEmail)(email);
            if (existingUser) {
                const otp = (0, generateOtp_1.default)();
                console.log("forgot pass", email, otp);
                (0, mailer_1.default)(email, otp);
                res.status(200).json({ otp });
            }
            if (!existingUser) {
                res.status(409).json({ error: 'Conflict - Email already exists' });
            }
        }
        catch (error) {
            res.json(error);
        }
    }),
    newPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const email = req.body.email;
            const newPassword = req.body.newPassword;
            console.log("email,new", email, newPassword);
            const userData = yield (0, updateUser_1.updatePassword)(newPassword, email);
            res.status(201).json(userData);
        }
        catch (error) {
            console.log(error);
        }
    }),
    getChaptersList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseId = req.query.courseId;
            if (courseId) {
                const chapersData = yield courseManagementUsecases_1.default.getChapters(courseId);
                res.json(chapersData);
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    getChapterDetails: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chapterId = req.query.chapterId;
            if (chapterId) {
                const chapersData = yield courseManagementUsecases_1.default.getChapter(chapterId);
                res.json(chapersData);
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
};
