import ChatSchema from "../../models/chatModel"

export default {
    createNewChat: async (data: IMessage) => {
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