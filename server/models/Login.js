import mongoose from "mongoose";


const LoginSchema = new mongoose.Schema({
    username: { type: String, },
    password: { type: String, }
    
    

    
});



const LoginModel = mongoose.model("Login", LoginSchema, "Login");


export { LoginModel };