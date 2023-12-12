import { userSignup } from './../../../adapters/controllers/userController';
import { saveUser, findUserByEmail } from "../../../adapters/data-access/repositories/userRepository";
import { securePassword } from '../../../adapters/external services/bcrypt';
import { formatDate } from "../../../adapters/external services/moment";
import {userSignupInterface} from '../../interfaces/userInterfaces'
export async function createUser({firstname,lastname,email,mobile,password,image,date}:userSignupInterface) {
  const existingUser = await findUserByEmail(email);
  if (!existingUser && password) {
    const securedPassword = await securePassword(password);
    const formattedDate = await formatDate(Date.now().toString());
    password = securedPassword;
    date = formattedDate;
    return await saveUser({firstname,lastname, email, mobile, password, image, date});
  } else {
    throw new Error("Email already exists in the database");
  }
}

module.exports = { createUser };

