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
const chatModel_1 = __importDefault(require("../../models/chatModel"));
exports.default = {
    createNewChat: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chat = new chatModel_1.default({
                chatId: data.id,
                messages: [{
                        from: data.from,
                        message: data.message,
                        to: data.to,
                    }]
            });
            const result = yield chat.save();
            return result;
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
