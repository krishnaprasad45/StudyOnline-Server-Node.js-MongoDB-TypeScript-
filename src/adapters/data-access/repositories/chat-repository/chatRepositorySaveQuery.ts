import { chat } from "../../../../business/interfaces/chatInterface"
import ChatSchema from "../../models/chatModel"




export default {
    createNewChat: async (data: chat) => {
        try {
            const chat = new ChatSchema({
                chatId: data.chatId,
                messages: data.message
            })
            const result = await chat.save()
            console.log("result :", result)
            return result
        } catch (error) {
            throw new Error((error as Error).message);

        }
    }
}