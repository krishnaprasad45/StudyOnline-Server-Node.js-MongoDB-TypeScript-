import { getAllMentors } from "../../../adapters/data-access/repositories/adminRepository";


export const getMentors = async () => {
  const mentorData = await getAllMentors();
  return mentorData;
};

module.exports = { getMentors };
