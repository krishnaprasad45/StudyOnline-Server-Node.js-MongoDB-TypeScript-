import { Types } from "mongoose"
import ChatSchema from "../../models/chatModel";
import { message } from '../../../../business/interfaces/chatInterface';


export default {
    updateChat: async (chatId: Types.ObjectId, message: message,) => {
        try {
            return await ChatSchema.findByIdAndUpdate(
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
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}