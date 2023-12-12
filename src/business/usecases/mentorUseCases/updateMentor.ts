import { findMentorByEmail, updateOne } from "../../../adapters/data-access/repositories/mentorRepository";
import {mentorProfile} from '../../interfaces/mentorInterfaces'

export async function updateMentor(data:mentorProfile) {
  try {
    const existingMentor = await findMentorByEmail(data.email);

    if (existingMentor) {
      const mentorData = await updateOne({...data});
      return mentorData;
    }
  } catch (error) {
    throw new Error("Mentor not found");
  }
}

module.exports = { updateMentor };
