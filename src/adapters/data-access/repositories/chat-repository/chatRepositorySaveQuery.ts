import ChatSchema from "../../models/chatModel"

export default {
    createNewChat: async (data: IMessage) => {
        try {

            console.log("data from createNewChat",data)
            const chat = new ChatSchema({
                chatId: data.id,
                messages: [{
                    from:data.from,
                    message:data.message,
                    to:data.to,
                }]
            })
            console.log("chat schema",chat)
            const result = await chat.save()
            console.log("result saved :", result)
            return result
        } catch (error) {
            console.log("error in chat save repo",error)
            throw new Error((error as Error).message);

        }
    }
}