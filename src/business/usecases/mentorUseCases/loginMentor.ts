import { findMentorByEmail } from "../../../adapters/data-access/repositories/mentorRepository";;
import { matchPassword } from '../../../adapters/external services/bcrypt';
import { generateMentorAuthToken } from "../../../frameworks/express/middlewares/jwtTokenAuth";

export async function loginMentor(email: string, password: string) {
  const existingMentor:any = await findMentorByEmail(email);
  if (existingMentor) {
    const isMatch = await matchPassword(password, existingMentor.password);
    if (isMatch) {
      const token = generateMentorAuthToken(existingMentor);
      return { mentorData: existingMentor, token };
    } else {
      throw new Error("Password Not Match");
    }
  } else {
    throw new Error("Mentor not found");
  }
}

module.exports = { loginMentor };
