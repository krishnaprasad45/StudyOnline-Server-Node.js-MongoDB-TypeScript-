export interface mentorSignupInterface {
    _id?:string,
    firstname:string,
    lastname:string,
    email:string,
    mobile:string,
    password:string,
    confirm_password?:string,
    image:string,
    date?:string
}

export interface mentorProfile {
    firstname:string,
    lastname:string,
    email:string,
    mobile:string,
    image:string,
    aadhar_image:string,
    experience_image:string,
    password:string,
   
}
