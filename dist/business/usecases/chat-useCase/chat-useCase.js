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
const chatRepositoryGetQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/chat-repository/chatRepositoryGetQuery"));
const chatRepositorySaveQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/chat-repository/chatRepositorySaveQuery"));
const chatRepositoryUpdateQuery_1 = __importDefault(require("../../../adapters/data-access/repositories/chat-repository/chatRepositoryUpdateQuery"));
exports.default = {
    saveChat: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("saveChat...", data);
            const checkChatExists = yield chatRepositoryGetQuery_1.default.getChatByChatId(data.id);
            console.log("checkChatExists..", checkChatExists);
            if (checkChatExists) {
                // Assuming updateChat function takes an id and the entire data
                yield chatRepositoryUpdateQuery_1.default.updateChat(checkChatExists._id, data);
            }
            else {
                yield chatRepositorySaveQuery_1.default.createNewChat(data);
            }
            return true;
        }
        catch (error) {
            console.log(error);
        }
    }),
    getChatByChatId: (chatId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield chatRepositoryGetQuery_1.default.getChatByChatId(chatId);
            return response === null || response === void 0 ? void 0 : response.messages;
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
