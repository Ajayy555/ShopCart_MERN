import { User } from "../models/user.model.js"
import bcrypt from "bcrypt";
const hashedPassword=async(password)=>{

    try {
        return await bcrypt.hash(password,10)
    } catch (error) {
        console.log(error,"Error while hashing password");
        
    }
}

const isPasswordCorrect = async function (DB_password,password) {
  
     try {
           return await bcrypt.compare(password,DB_password)
     } catch (error) {
        console.log(error,"Error while dcrypting  password");
     }
    }

export {hashedPassword,isPasswordCorrect}