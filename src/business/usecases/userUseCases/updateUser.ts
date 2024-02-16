import { findUserByEmail, updateMentor, updateOne, updatenewPassword } from"../../../adapters/data-access/repositories/userRepository";;
import {userProfileInterface} from '../../../business/interfaces/userInterfaces'
import { securePassword } from "../../../adapters/external services/bcrypt";

export const updateUser = async ({ firstname, lastname, email, mobile, image, oldEmail }: userProfileInterface) => {
  try {
    if (oldEmail) {
      const existingUser = await findUserByEmail(oldEmail);
      if (existingUser) {
        const userData = await updateOne({ firstname, lastname, email, mobile, image, oldEmail });
        return userData;
      }
    } else {
      throw new Error("Email is undefined");
    }
  } catch (error) {
    throw new Error("User not found");
  }
};
export const updatePassword = async (newPassword:string | undefined ,email:string) => {
  try {
   
    const securedPassword:string |undefined = await securePassword(newPassword);
    console.log("secure",securedPassword)
    if(securedPassword){
      console.log(26)
      const userData = await updatenewPassword(email, securedPassword);
      return userData;
    }

  } catch (error) {
    console.log(error)
  }
}

export const updateMentorName = async (mentorName:string,email:string,courseId:string) => {
  try {
    if (email) {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        const userData = await updateMentor(email,mentorName,courseId);
        return userData;
      }
    } else {
      throw new Error("Email is undefined");
    }
  } catch (error) {
    throw new Error("User not found");
  }
};


