import cloudinary from 'cloudinary';
import { catchAsyncErrors } from "../middlewares/catchAscynError.js";
import ErrorHandler from '../middlewares/error.js';
import { Application } from '../models/applicationSchema.js';
import { Job } from '../models/jobSchema.js';
export const employerGetAllApplications=catchAsyncErrors(async(req,res,next)=>{
    const {role}=req.user;
    if(role==='Job seeker'){
        return next(new ErrorHandler('Job seeker is not allowed to access this resources!',400))
    };
    const {_id}=req.user;
    const applications=await Application.find({'employerID.user':_id});
    res.status(200).json({
        success:true,
        applications
    })
})

export const jobseekerGetAllApplications=catchAsyncErrors(async(req,res,next)=>{
    const {role}=req.user;
    if(role==='Employer'){
        return next(new ErrorHandler('Employer is not allowed to access this resources!',400))
    };
    const {_id}=req.user;
    const applications=await Application.find({'applicantID.user':_id});
    res.status(200).json({
        success:true,
        applications
    })
})
export const jobseekerDelApplication=(catchAsyncErrors(async(req,res,next)=>{
    const {role}=req.user;
    if(role==='Employer'){
        return next(new ErrorHandler('Employer is not allowed to delete application!',400))
    };
    const {id}=req.params;
    const application=await Application.findById(id);
    if(!application){
        return next(new ErrorHandler('Oops!, Application not found',404))

    }
    await application.deleteOne();
    res.status(200).json({
        success:true,
        message:"Application deleted successfully!"
    })
}))
export const postApplication = catchAsyncErrors(async(req, res, next) => {


    const { role } = req.user;
    if (role === 'Employer') {
        return next(new ErrorHandler('Employer can not access the resources!', 403));
    }

    if (!req.files) {
        console.log('No files object in request');
        return next(new ErrorHandler('No files were uploaded', 400));
    }

    if (!req.files.resume) {
        console.log('No resume file found');
        return next(new ErrorHandler('Resume file required', 400));
    }

    const { resume } = req.files;
    console.log('Resume file details:', {
        name: resume.name,
        type: resume.mimetype,
        size: resume.size
    });

    const allowedFormats=['image/png','image/jpg','image/webp'];
    if(!allowedFormats.includes(resume.mimetype)){
        return next(new ErrorHandler('invalid file type. Please upload png, jpg and webp format',400))
    }
    const cloudinaryResponse=await cloudinary.uploader.upload(
        resume.tempFilePath
    );
    console.log(cloudinaryResponse)
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error('cloudinary error',cloudinaryResponse.error || "Unknown cloudinary error")
        return next(new ErrorHandler('Failed to upload resume',500))
    }
    const {name,email,coverLetter,phone,address,jobId}= req.body;
    const applicantID={
        user:req.user._id,
        role:'Job seeker',
    }
    if(!jobId){
        return next(new ErrorHandler('Job not found',404))
    }
    const jobDetails=await Job.findById(jobId);
    if(!jobDetails){
        return next(new ErrorHandler('Job not found',404))
    }
    const employerID={
        user:jobDetails.postedBy,
        role:'Employer',
    };
    if(!name || !email || !coverLetter || !phone || !address || !employerID || !applicantID || !resume){
        return next(new ErrorHandler('Please fill all fields',404))
    }
    const application= await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        employerID,
        applicantID,
        resume:{
            public_id:cloudinaryResponse.public_id ,
            url:cloudinaryResponse.secure_url ,
        }
    })
    res.status(200).json({
        success:true,
        message:'application submitted successfully'
    })
})
//application done