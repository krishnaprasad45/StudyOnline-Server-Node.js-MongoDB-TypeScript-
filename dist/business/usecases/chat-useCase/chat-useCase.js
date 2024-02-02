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
            const checkChatExists = yield chatRepositoryGetQuery_1.default.getChatByChatId(data.id);
            let chat;
            if (checkChatExists) {
                // Assuming updateChat function takes an id and the entire data
                chat = yield chatRepositoryUpdateQuery_1.default.updateChat(checkChatExists._id, data);
            }
            else {
                chat = yield chatRepositorySaveQuery_1.default.createNewChat(data);
            }
            return chat;
        }
        catch (error) {
            console.log(error);
        }
    }),
    getChatByChatId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const chatId = req.query.chatId;
            const response = yield chatRepositoryGetQuery_1.default.getChatByChatId(chatId);
            res.json(response);
        }
        catch (error) {
            throw new Error(error.message);
        }
    })
};
