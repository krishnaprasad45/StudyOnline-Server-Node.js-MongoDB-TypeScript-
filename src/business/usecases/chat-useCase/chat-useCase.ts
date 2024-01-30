import chatRepositoryGetQuery from "../../../adapters/data-access/repositories/chat-repository/chatRepositoryGetQuery"
import chatRepositorySaveQuery from "../../../adapters/data-access/repositories/chat-repository/chatRepositorySaveQuery"
import chatRepositoryUpdateQuery from "../../../adapters/data-access/repositories/chat-repository/chatRepositoryUpdateQuery"





export default {
    saveChat: async (data: IMessage) => {
        try {
            console.log("saveChat...",data);
            const checkChatExists = await chatRepositoryGetQuery.getChatByChatId(data.id);
            console.log("checkChatExists..",checkChatExists)
            if (checkChatExists) {
                // Assuming updateChat function takes an id and the entire data
                await chatRepositoryUpdateQuery.updateChat(checkChatExists._id, data);
            } else {
                await chatRepositorySaveQuery.createNewChat(data);
            }
            return true;
        } catch (error) {
            console.log(error);
        }
    },

    getChatByChatId: async (chatId: string) => {
        try {
            const response = await chatRepositoryGetQuery.getChatByChatId(chatId)
            return response?.messages
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}