import ChatSchema from "../../models/chatModel";

export default {
    getChatByChatId: async (chatId: string | undefined) => {
        try {
            return ChatSchema.findOne({ chatId: chatId })
         
        } catch (error) {
            throw new Error((error as Error).message);

        }
    }
}