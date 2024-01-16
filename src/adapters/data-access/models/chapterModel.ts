import mongoose from 'mongoose'

const chapterSchema = new mongoose.Schema({

    title: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    chaptervideo: {
        type: String,
        required: true,
      },
    courseId: {
        type: String,
       
      },

  });
  
  const Chapter = mongoose.model('chapter', chapterSchema);
  export default Chapter