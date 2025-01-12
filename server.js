import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import app from './app.js';
cloudinary.v2.config({ //v2=version2
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_CLIENT_API,
    api_secret:process.env.CLOUDINARY_CLIENT_SECRET
})
dotenv.config({path:'./config/config.env'})

// const port=process.env.PORT || 3000


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})