import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
    try{
        console.log((`${process.env.PORT}`))
        const connectStatus =  mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log(`\n MongoDB Succesfully Connected \n DB HOST: ${(await connectStatus).connection.host}`)
    }
    catch(error){
        console.log(`ERROR: ${error}`)
        process.exit(1)
    }
}

export default connectDB