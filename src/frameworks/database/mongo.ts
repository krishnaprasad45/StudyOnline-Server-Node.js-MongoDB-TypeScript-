import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/StudyOnline');
    console.log("database connected");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
