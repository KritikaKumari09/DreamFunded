import { v2 as cloudinary } from 'cloudinary';

export async function uploadOnCloudinary(path) {
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET 
    });
    try {
        return await cloudinary.uploader
        .upload(
            path
        )
    } catch (error) {
        console.log('Cloudinary Upload Failed!',error)
    }
}