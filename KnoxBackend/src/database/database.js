import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// const temp = "mongodb+srv://laveeshtomar:uchihasasuke@cluster0.az7cy7e.mongodb.net"

const connectDB = async ()=>{
    try{
        const connectStatus =  mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log(`\n MongoDB Succesfully Connected \n DB HOST: ${(await connectStatus).connection.host}`)
    }
    catch(error){
        console.log(`ERROR: ${error}`)
        process.exit(1)
    }
}

export default connectDB