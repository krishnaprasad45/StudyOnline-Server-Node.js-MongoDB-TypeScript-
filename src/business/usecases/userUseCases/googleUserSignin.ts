import { response } from "express";
import { handleError } from "../../errors/errorHandling";
import { userGoogleSignUp } from "../../interfaces/userInterfaces";
import { createUserFromGoogle } from "./createUserFromGoogle";
import { findUser } from "./findUser";

export default {
    googleSignin: async (data: userGoogleSignUp) => {
        try {
            const checkEmailExists = await findUser(data.email)
            console.log("checkEmailExists",checkEmailExists)
            if (checkEmailExists) {
                
                return true
            }
            else {
            
                const saveUser = await createUserFromGoogle({
                    name: data.name,
                    email: data.email,
                   
                  })
                return true
            }

        } catch (error) {
            handleError(error as Error)
        }
    },
}