import { saveMentor, findMentorByEmail } from "../../../adapters/data-access/repositories/mentorRepository";;
import { securePassword } from '../../../adapters/external services/bcrypt';
import { formatDate } from '../../../adapters/external services/moment';
import { mentorSignupInterface } from "../../../business/interfaces/mentorInterfaces";

export async function createMentor({firstname,lastname,email,mobile,password,image,date}:mentorSignupInterface) {
  const existingMentor = await findMentorByEmail(email);
  if (!existingMentor) {
    const securedPassword:string = await securePassword(password);
    
    const formattedDate = await formatDate(Date.now().toString());
    password = securedPassword;
    date = formattedDate;
    return await saveMentor({firstname,lastname, email, mobile, password, image,date});
  } else {
    throw new Error("Email already exists in the database");
  }
}



module.exports = { createMentor };
