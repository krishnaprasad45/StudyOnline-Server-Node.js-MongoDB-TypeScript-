import { findMentorByEmail } from "../../../adapters/data-access/repositories/mentorRepository";;

export async function findMentor(email:string) {
  const mentorData = await findMentorByEmail(email);
  return mentorData;
}

module.exports = { findMentor };
