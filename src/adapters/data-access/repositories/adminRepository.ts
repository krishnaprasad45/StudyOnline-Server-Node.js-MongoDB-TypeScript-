import adminModel from "../../data-access/models/adminModel";
import userModel from "../../data-access/models/userModel";
import { adminSigninInterface } from "../../../business/interfaces/adminInterfaces";
import mentorModel from "../models/mentorModel";

export default {
  findAdmin: async ({ email, password }: adminSigninInterface) => {
  
    const adminData = await adminModel.findOne({ email });
    return { email: "admin@gmail.com", password: "password" };
  },

  getAllUsers: async () => {
    return await userModel.find().lean();
  },
  getAllMentors: async () => {
    return await mentorModel.find().lean();
  },

  findUpdateUser: async (_id: string) => {
    const userData = await userModel.findById(_id);
    return userData;
  },
};
