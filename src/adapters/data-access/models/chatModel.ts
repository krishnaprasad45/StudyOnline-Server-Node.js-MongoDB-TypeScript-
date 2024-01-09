
import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
   
    messages: [
        {
            from: {
                type: String,
                
            },
            to: {
                type: String,
                
            },
            message: {
                type: String,
                
            },
            timestamp: {
                type: Date,
                default: Date.now
            },
            id:{
                type:String,
                required:true
            },
            chatId:{
                type:String,
                required:true
            }
            
        }
    ]
});

const ChatSchema = mongoose.model("Chat", chatSchema);


export default ChatSchema;
