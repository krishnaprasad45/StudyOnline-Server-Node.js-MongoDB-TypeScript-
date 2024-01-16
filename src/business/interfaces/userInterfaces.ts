import { ArrayExpressionOperatorReturningBoolean } from "mongoose"

export interface userSignupInterface {
    _id?:string,
    firstname:string | null,
    lastname?:string,
    email:string | null,
    mobile?:string,
    password?:string,
    confirm_password?:string,
    image?:string,
    date?:string
}
export interface profileUpdateInterface {
    _id?:string,
    firstname:string,
    lastname:string,
    email:string,
    mobile:string,
    image:string,
   
}
export interface userProfileInterface {
    firstname?:string,
    lastname?:string,
    email?:string,
    mobile?:string,
    password?:string,
    image?:string,
    oldEmail?:string,
    isBlock?:boolean,
    mentorIncharge?:string,
    courseId?:string
   
}
export interface userGoogleSignUp {
    name: string,
    email: string,
}
