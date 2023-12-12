
import { findAdmin } from "../../../adapters/data-access/repositories/adminRepository";
import { generateadminToken } from "../../../frameworks/express/middlewares/auth";
import  {adminSigninInterface} from "../../interfaces/adminInterfaces"

export async function adminLogin({email,password}:adminSigninInterface) {
  const adminData = await findAdmin({ email, password }); 
  if (adminData.email && adminData.password === password) {
    const adminToken = generateadminToken(adminData);
    return { adminData, adminToken };
  } else {
    console.log(adminData?.password, password);
    return { message: "password not match" };
  }
}

module.exports = { adminLogin };
