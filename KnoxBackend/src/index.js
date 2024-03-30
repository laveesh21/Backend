import dotenv from 'dotenv'
import connectDB from "./database/database.js";

dotenv.config()

connectDB()























/*

import Express from "express";
const app = Express()

// This is our first approach using IIFE
;( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error", ()=>{
            console.log("ERROR: ", error)
        })
    }catch(error){
        console.log("ERROR: " + error)
        throw err
    }

    app.listen(process.env.PORT,  ()=>{
        console.log(`App is listening on PORT: ${process.env.PORT}`)
    })

} )()

*/