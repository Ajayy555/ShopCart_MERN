import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js"

export const generateUserToken=async function(userId){

    const user=await User.findById(userId)
    if(!user) {
        res.status(500).json({message:'Interal server error while genrating token'})
    }

    return await jwt.sign({
        _id:user._id,
        name:user.name,
        role:user.role,
    },process.env.JWT_TOKEN_SECRET,{expiresIn:process.env.JWT_TOKEN_EXPIRY})
}


