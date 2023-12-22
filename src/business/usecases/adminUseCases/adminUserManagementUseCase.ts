import userModel from "../../../adapters/data-access/models/userModel";
import adminRepository from "../../../adapters/data-access/repositories/adminRepository";

export default {
  getUsers: async () => {
    try {
      const userData = await adminRepository.getAllUsers();
      return userData;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

  blockUser: async (userId: string) => {
    try {
      const user = await userModel.findById(userId);
      if (user) {
        user.isBlock = !user.isBlock;
        return await user.save();
      }
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
};
