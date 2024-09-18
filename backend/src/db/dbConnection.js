import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
    
   export const dbConnection=async()=>{
       try {
         const db=await mongoose.connect(`${process.env.URI}/${DB_NAME}`);
         console.log(`Mongo Db connected`);
         

       } catch (error) {
        console.log(`error while db connection : ${error}`);
        process.exit(1)  
       }
    }
