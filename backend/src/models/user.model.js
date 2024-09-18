import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true, 
    },
    profilePicture:{
        type:String,
    },
    token:{
        type:String,
    },
    role:{
        type:String,
        enum:['admin','public'],
        default:'public'

    }
},{timestamps:true});

// userSchema.pre("save",async function(next){ 
//     if(!this.isModified("password")) return next();

//    return this.password=await bcrypt.hash(this.password,10)
//    next()
// })

// userSchema.methods.isPasswordCorrect = async function (password) {
//     return await bcrypt.compare(password,this.password)
// }

// userSchema.methods.generateUserToken=async function(){
//     return await jwt.sign({
//         _id:this._id,
//         name:this.name,
//     },process.env.TOKEN_SECRET,{expiresIn:process.env.TOKEN_EXPIRY})

// }

export const User=new mongoose.model("User",userSchema);