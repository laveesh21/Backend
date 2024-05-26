import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// File Upload Function
const uploadOnCloudinary = async (localFilePath) => {
    try {
        
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        console.log("File Uploaded Successfully On Cloudinary: ", response.url);
        fs.unlinkSync(localFilePath);
        return response.url;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log("ERROR: File Uploading Failed")
    }
};

export { uploadOnCloudinary };
