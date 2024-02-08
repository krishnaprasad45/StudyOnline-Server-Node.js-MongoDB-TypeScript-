import ChatSchema from "../../models/chatModel"
import message from "../../../../business/interfaces/chatInterface"
export default {
    createNewChat: async (data: message) => {
        try {

            const chat = new ChatSchema({
                chatId: data.id,
                messages: [{
                    from:data.from,
                    message:data.message,
                    to:data.to,
                }]
            })
            const result = await chat.save()
            return result
        } catch (error) {
            throw new Error((error as Error).message);

        }
    }
}