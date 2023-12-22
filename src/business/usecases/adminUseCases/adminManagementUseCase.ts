
import adminRepository  from "../../../adapters/data-access/repositories/adminRepository";
import { generateadminToken } from "../../../frameworks/express/middlewares/jwtTokenAuth";
import  {adminSigninInterface} from "../../interfaces/adminInterfaces"

export async function adminLogin({email,password}:adminSigninInterface) {
  const adminData = await adminRepository.findAdmin({ email, password }); 
  if (adminData.email && adminData.password === password) {
    const adminToken = generateadminToken(adminData);
    return { adminData, adminToken };
  } else {
   
    return { message: "password not match" };
  }
}

module.exports = { adminLogin };
