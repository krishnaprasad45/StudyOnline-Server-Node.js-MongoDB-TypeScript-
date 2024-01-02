import { userSignup } from "../../controllers/userController/userController";
import userModel from "../models/userModel";

import { userSignupInterface } from "../../../business/interfaces/userInterfaces";
import { userProfileInterface } from "../../../business/interfaces/userInterfaces";
export async function saveUser(data: {
  email: string;
  name: string;
  date: string;
}) {
  try {
    const user = new userModel({ ...data });

    const result = await user.save();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function findUserByEmail(email: string | null) {
  const userData = await userModel.findOne({ email });

  return userData;
}

export async function updateOne(data: userProfileInterface) {
  const userData = await userModel.findOneAndUpdate(
    { email: data.oldEmail },
    {
      $set: {
        ...data,
      },
    },
    { new: true }
  );
  return userData;
}
export async function updateMentor(email:string,mentorName:string) {
  const userData = await userModel.findOneAndUpdate(
    { email: email },
    {
      $set: {
        mentorIncharge:mentorName
      },
    },
    { new: true }
  );
  return userData;
}

export async function deleteOne(_id: string) {
  const response = await userModel.findByIdAndDelete(_id);
  if (response) {
    return response;
  } else {
    return { message: "User not found" };
  }
}

module.exports = { saveUser, findUserByEmail, updateOne, deleteOne ,updateMentor};
