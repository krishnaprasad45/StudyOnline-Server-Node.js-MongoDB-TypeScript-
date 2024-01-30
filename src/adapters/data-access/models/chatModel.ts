
import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
   
    chatId:{
        type:String
    },
    messages: [
        {
            from: {
                type: String,
                
            },
            message: {
                type: String,
                
            },
            to: {
                type: String,
                
            },
            id:{
                type:String
            },
         
            timestamp: {
                type: Date,
                default: Date.now
            }
            
            
        }
    ]
});

const ChatSchema = mongoose.model("Chat", chatSchema);


export default ChatSchema;
