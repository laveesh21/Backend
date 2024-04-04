import dotenv from 'dotenv'
dotenv.config()
import connectDB from "./database/database.js";
import app from  "./app.js"


const PORT = process.env.PORT


connectDB()
.then(()=>{
    app.listen( PORT || 8000, ()=>{
        console.log(`Server is listening at PORT:${PORT}`)
    })
})
.catch((err)=>{
    console.log("MongoDB Connection Failed")
})























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