import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  aadhar_image: {
    type: String,
  },
  experience_image: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
});


const Mentor = mongoose.model('Mentor', mentorSchema);
export default Mentor;
