import chatRepositoryGetQuery from "../../../adapters/data-access/repositories/chat-repository/chatRepositoryGetQuery"
import chatRepositorySaveQuery from "../../../adapters/data-access/repositories/chat-repository/chatRepositorySaveQuery"
import chatRepositoryUpdateQuery from "../../../adapters/data-access/repositories/chat-repository/chatRepositoryUpdateQuery"





export default {
    saveChat: async (data: IMessage) => {
        try {
            console.log("saveChat...");
            const checkChatExists = await chatRepositoryGetQuery.getChatByChatId(data.chatId);
    
            if (checkChatExists) {
                // Assuming updateChat function takes an id and the entire data
                await chatRepositoryUpdateQuery.updateChat(checkChatExists._id, data.message);
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