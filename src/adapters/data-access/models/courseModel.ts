import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    createdby: {
      type: String,
      
    },
    createdat:{
      type:String,

    },
    description: {
        type: String,
        required: true,
      },
    banner: {
        type: String,
        required: true,
      },
    introvideo: {
        type: String,
        required: true,
      },
      isUnlisted: {
        type: Boolean,
        default: false,
      },
  
  });
  
  const Course = mongoose.model('course', courseSchema);
  export default Course