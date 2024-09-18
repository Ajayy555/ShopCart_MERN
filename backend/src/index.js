import express from "express";
import "dotenv/config"
import { dbConnection } from "./db/dbConnection.js";
import { app } from "./app.js";

dbConnection()
.then(()=>{
    
    app.get("/",(req,res)=>{
        console.log(`Welcome to mobile Cart`);
        res.send('welcome to mobilecart')
    })

    app.listen(process.env.PORT||4040,()=>{
        console.log(`Server Running on port : ${process.env.PORT}`);
    })
    
})
.catch((error)=>{
    console.log(error);
    
})
