import { findUserByEmail, updateMentor, updateOne } from"../../../adapters/data-access/repositories/userRepository";;
import {userProfileInterface} from '../../../business/interfaces/userInterfaces'

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

export const updateMentorName = async (mentorName:string,email:string) => {
  try {
    if (email) {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        const userData = await updateMentor(email,mentorName);
        return userData;
      }
    } else {
      throw new Error("Email is undefined");
    }
  } catch (error) {
    throw new Error("User not found");
  }
};


