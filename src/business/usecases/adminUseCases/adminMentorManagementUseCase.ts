import mentorModel from "../../../adapters/data-access/models/mentorModel";
import adminRepository  from "../../../adapters/data-access/repositories/adminRepository";

export default {

getMentors : async () => {
  const mentorData = await adminRepository.getAllMentors();
  return mentorData;
},
blockMentor: async (mentorId: string) => {
  try {
    const mentor = await mentorModel.findById(mentorId);
    if (mentor) {
      mentor.isBlock = !mentor.isBlock;
      return await mentor.save();
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
},
verifyMentor: async (mentorId: string, status:string) => {
  try {
    const mentor = await mentorModel.findById(mentorId);
    if (mentor) {
      mentor.verification = status;
      return await mentor.save();
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
},

}

