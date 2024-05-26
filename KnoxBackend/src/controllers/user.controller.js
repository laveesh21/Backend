import {asyncHandler} from '../utils/asyncHandler.js'
import { ApiError }  from '../utils/ApiError.js'
import User from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/Cloudinary.js'
                                                                                                                   
const registerUser = asyncHandler( async (req, res)=>{

    // GET data from frontend
    const {fullname, username, email, password} = req.body

    //Validate Credentials
    if([fullname, username, email, password].some((field)=>{ field?.trim()==="" })){
        throw new ApiError(400, "All Fields Are Required")
    }

    //Check if user exists
    const existingUser = await User.findOne({$or: [{username}, {email}]})
    if(existingUser){
        throw new ApiError(409, "User With email or username already exist")
    }


    const avatarLocalStoragePath = req.files?.avatar[0]?.path;
    // const coverImageLocalStoragePath = req.files?.coverImage[0]?.path;

    let coverImageLocalStoragePath
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        const coverImageLocalStoragePath = req.files.coverImage[0].path;
    }

    if(!avatarLocalStoragePath){
        throw new ApiError(400,'Avatar file is required')
    }

    const avatar = await uploadOnCloudinary(avatarLocalStoragePath)
    const coverImage  = await uploadOnCloudinary(coverImageLocalStoragePath)

    const user = await User.create({
        fullname,
        avatar: avatar,
        coverImage: coverImage,
        email,
        username,
        password,
    })
43

    res.status(201).json({message: "User Succesfully Created"})

})

const loginUser = asyncHandler( async(req, res)=>{

    const {email, username, password} = req.body 
    
    if(!username || !email){
        throw new ApiError(400, "Username or Email is required")
    }

    const user = await User.findOne({ $or:[ {email},{username} ]} )
    if(!user){
        throw new ApiError(404,"User Does Not Exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid User Credentials")
    }

    

    
})

export {
    registerUser,
}