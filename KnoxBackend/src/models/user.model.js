import mongoose, {Schema} from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({

   username:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
   },

   email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
   },

   fullname:{
    type: String,
    required: true,
    trim: true,
    index: true
   },

   avatar: {
    type: String, //Cloudinary URL
    required: true
   },

   coverImage: {
    type: String, //Cloudinary URL
   },

   watchHistory:{
    type: Schema.Types.ObjectId,
    ref: "Video"
   },

   password: {
    type: String,
    required: [true,"Password is required"]
   },

   refreshToken: {
    type: String
   }



}, {timestamps: true})

// Middleware to encrypt password with bcrypt just before saving it
userSchema.pre("save", async function(next){
   if(this.isModified("password"))return next
   this.password = await bcrypt.hash(this.password, 8)
   next()
})

//Method to test if password is correct or not
userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password)
}

// Methos to generate JWT token
userSchema.method.generateAccessToken = async function(){
   const token = jwt.sign({
         _id:this._id,
         username: this.username,
         email: this.email
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }

   )
   return token
}

userSchema.method.generateRefreshToken = async function(){
      const token = jwt.sign({
         _id:this._id,
         username: this.username,
         email: this.email
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }

   )
   return token
}

const User = mongoose.model("User", userSchema)
export default User