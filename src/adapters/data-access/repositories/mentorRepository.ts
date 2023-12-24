import mentorModel from "../models/mentorModel";
import { mentorProfile } from "../../../business/interfaces/mentorInterfaces";
import {mentorSignupInterface} from "../../../business/interfaces/mentorInterfaces"

export async function saveMentor(data:mentorSignupInterface) {
  const mentor = new mentorModel({ ...data });

  return await mentor.save();
}

export async function findMentorByEmail(email:string) {
  

  const mentorData = await mentorModel.findOne({ email });

  return mentorData;
}

export async function updateOne(data:mentorProfile) {
  const mentorData = await mentorModel.findOneAndUpdate(
    { email:data.email },
    {
      $set: {
        ...data
      },
    },
    { new: true }
  );
  return mentorData;
}

async function deleteOne(_id: string) {
  const response = await mentorModel.findByIdAndDelete(_id);
  if (response) {
    return response;
  } else {
    return { message: "Mentor not found" };
  }
}

module.exports = { saveMentor, findMentorByEmail, updateOne, deleteOne };
