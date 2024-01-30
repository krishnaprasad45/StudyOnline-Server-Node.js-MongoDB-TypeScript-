import { Types } from "mongoose"
import ChatSchema from "../../models/chatModel";
import { message } from '../../../../business/interfaces/chatInterface';


export default {
    updateChat: async (chatId: Types.ObjectId, message: message,) => {
        console.log("function update",message)
        try {
             const result = await ChatSchema.findByIdAndUpdate(
                chatId,
                {
                    $push: {
                        messages: message
                    },
                },
                {
                    new: true
                }
            )
            console.log("result",result)
            return result
        } catch (error) {
            console.log("error in chat update repo",error)
            throw new Error((error as Error).message);
        }
    }
}