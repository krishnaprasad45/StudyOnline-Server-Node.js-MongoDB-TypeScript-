import chatRepositoryGetQuery from "../../../adapters/data-access/repositories/chat-repository/chatRepositoryGetQuery"
import chatRepositorySaveQuery from "../../../adapters/data-access/repositories/chat-repository/chatRepositorySaveQuery"
import chatRepositoryUpdateQuery from "../../../adapters/data-access/repositories/chat-repository/chatRepositoryUpdateQuery"
import { Request, Response } from "express";





export default {
    saveChat: async (data: IMessage) => {
        try {
             const checkChatExists = await chatRepositoryGetQuery.getChatByChatId(data.id);
            let chat
            if (checkChatExists) {
                // Assuming updateChat function takes an id and the entire data
                chat = await chatRepositoryUpdateQuery.updateChat(checkChatExists._id, data);
            } else {
                chat = await chatRepositorySaveQuery.createNewChat(data);
            }
            return chat;
        } catch (error) {
            console.log(error);
        }
    },

    getChatByChatId: async (req: Request, res: Response) => {
        try {
            const chatId = req.query.chatId as string | undefined;
            const response = await chatRepositoryGetQuery.getChatByChatId(chatId)
            res.json(response)
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}