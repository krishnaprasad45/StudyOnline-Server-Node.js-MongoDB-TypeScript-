import { userSignup } from '../../controllers/userController/userController';
import userModel from "../models/userModel";

import { userSignupInterface } from '../../../business/interfaces/userInterfaces';
import { userProfileInterface } from '../../../business/interfaces/userInterfaces';
export async function saveUser(data:{email:string,name:string,date:string}) {
  try{
    console.log("saveUser fn..")
  const user = new userModel({ ...data});
  console.log("user",user)
 const result =  await user.save();
 console.log(result,"result")
 return result
  }catch(error){
    console.log(error)
  }
}

export async function findUserByEmail(email:string | null) {
  console.log("findUserByEmail fn..",email)
  const userData = await userModel.findOne({ email });
  console.log("userData from findUserByEmail fn",userData)
  return userData;
}

export async function updateOne(data:userProfileInterface) {
  const userData = await userModel.findOneAndUpdate(
    { email:data.oldEmail },
    {
      $set: {
        ...data
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

module.exports = { saveUser, findUserByEmail, updateOne, deleteOne };
