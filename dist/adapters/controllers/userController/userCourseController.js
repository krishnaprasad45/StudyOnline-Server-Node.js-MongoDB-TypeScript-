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
    payments: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const paymentDetails = {
            courseAmount: req.body.amount,
            courseTitle: req.body.courseTitle,
            createdBy: req.body.createdBy,
            usedEmail: req.body.token.email,
            type: req.body.token.type,
            transactionId: req.body.token.created,
            cardType: req.body.token.card.brand,
        };
        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
        try {
            const intent = yield stripe.paymentIntents.create({
                amount: paymentDetails.courseAmount,
                currency: "inr",
                automatic_payment_methods: { enabled: true },
            });
            yield courseManagementUsecases_1.default.savePaymentDetails(Object.assign({}, paymentDetails));
            yield (0, updateUser_1.updateMentorName)(paymentDetails.createdBy, paymentDetails.usedEmail);
            res.json({ client_secret: intent.client_secret });
        }
        catch (error) {
            console.log(error);
        }
    }),
    getPaymentHistory: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const email = req.query.email;
            console.log("**email**", email);
            if (email) {
                const historyData = yield courseManagementUsecases_1.default.getHistory(email);
                console.log("his..", historyData);
                res.json(historyData);
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
    getChaptersList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const email = req.query.email;
            console.log("**email**", email);
            if (email) {
                const historyData = yield courseManagementUsecases_1.default.getHistory(email);
                console.log("his..", historyData);
                res.json(historyData);
            }
        }
        catch (error) {
            console.log(error);
        }
    }),
};
