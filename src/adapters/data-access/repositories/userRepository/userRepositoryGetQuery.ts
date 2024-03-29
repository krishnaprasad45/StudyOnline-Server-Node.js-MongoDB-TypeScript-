import { ObjectId } from "mongoose";
import UserSchema from "../../models/userModel"



const userRepositoryGetQuery = {
    getUserWithId: async (userId: string) => {
        try {
            return await UserSchema.findById(userId);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    getUser: async (field: string, data: string) => {
        try {
            const query: { [key: string]: string } = {};
            query[field] = data;
            return await UserSchema.find(query);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    getAllUsers: async () => {
        try {
            return await UserSchema.find()
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
};

export default userRepositoryGetQuery;