import { saveUser } from "../../../adapters/data-access/repositories/userRepository";
import { formatDate } from "../../../adapters/external services/moment";
import {userGoogleSignUp, userProfileInterface} from '../../interfaces/userInterfaces'
export async function createUserFromGoogle({name,email}:userProfileInterface) {
    const formattedDate = await formatDate(Date.now().toString());
    const date = formattedDate;
    return await saveUser({name,email,date});
 
}

module.exports = { createUserFromGoogle };

