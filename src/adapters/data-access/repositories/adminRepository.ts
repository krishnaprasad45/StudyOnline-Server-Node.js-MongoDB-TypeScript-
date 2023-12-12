import adminModel from "../../data-access/models/adminModel";
import userModel from "../../data-access/models/adminModel";
import {adminSigninInterface} from "../../../business/interfaces/adminInterfaces"

export async function findAdmin({email,password}:adminSigninInterface) {
  console.log()
  const adminData = await adminModel.findOne({ email });
  return {email:"admin@gmail.com", password:"password"};
}

export async function getAllUsers() {
  return await userModel.find().lean();
}

export async function findUpdateUser(_id:string) {
  const userData = await userModel.findById(_id);
  return userData;
}



module.exports = { findAdmin, getAllUsers, findUpdateUser };
