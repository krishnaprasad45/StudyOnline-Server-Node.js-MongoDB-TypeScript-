import { findUserByEmail, updateOne } from"../../../adapters/data-access/repositories/userRepository";;
import {userProfileInterface} from '../../../business/interfaces/userInterfaces'

export async function updateUser({ firstname, lastname, email, mobile, image ,oldEmail}: userProfileInterface) {
  try {
    if (oldEmail) {
      const existingUser = await findUserByEmail(oldEmail);
      if (existingUser) {
        const userData = await updateOne({ firstname, lastname, email, mobile, image,oldEmail });
        return userData;
      }
    } else {
      throw new Error("Email is undefined");
    }
  } catch (error) {
    throw new Error("User not found");
  }
}
module.exports = { updateUser };
