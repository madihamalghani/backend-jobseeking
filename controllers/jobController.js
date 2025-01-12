import { catchAsyncErrors } from '../middlewares/catchAscynError.js';
import ErrorHandler from '../middlewares/error.js';
import { Job } from '../models/jobSchema.js';

export const getAllJobs=catchAsyncErrors(async(req,res,next)=>{
    const jobs=await Job.find({expired:false})
    res.status(200).json({
        success:true,
        jobs,
    })
})
export const postJob=catchAsyncErrors(async (req,res,next)=>{
    const {role}=req.user;
    if(role=='Job seeker'){
        return next(new ErrorHandler('Job seeker is not allowed to access this resources!',400))
    };
    const {title,description,category,country,city,location,fixedSalary,salaryForm,salaryTo}=req.body
    if(!title || !description || !category || !country || !city || !location){
        return next(new ErrorHandler('Please provide ful job details',400))
    }
    if((!salaryForm || !salaryTo) && !fixedSalary){
        return next(new ErrorHandler('Please either provide fix salary or ranged salary',400))
    }
    if(salaryForm && salaryTo && fixedSalary){
        return next(new ErrorHandler('Can not enter fixed and ranged salary together',400))
    }
    const postedBy= req.user._id;
    const job=await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryForm,
        salaryTo,
        postedBy  //id wala hi a jae
    })
    res.status(200).json({
        success:true,
        message:'Job posted successfully',
    })


})

export const getMyJobs=catchAsyncErrors(async(req,res,next)=>{
    const {role}=req.user;
    if(role=='Job seeker'){
        return next(new ErrorHandler('Job seeker is not allowed to access this resources!',400))
    };
    const myJobs=await Job.find({postedBy:req.user._id});
    res.status(200).json({
        success:true,
        myJobs,
    })
})
export const updateJob=catchAsyncErrors(async(req,res,next)=>{
    const {role}=req.user;
    if(role=='Job seeker'){
        return next(new ErrorHandler('Job seeker is not allowed to access this resources!',400))
    };
    const {id}=req.params;
    let job =await Job.findById(id)
    if(!job){
        return next(new ErrorHandler('Ops!!! job not found',404))

    }
    job=await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        job,
        message: 'Job updated successfully'
    })
})
export const deleteJob=catchAsyncErrors(async(req,res,next)=>{
    const {role}=req.user;
    if(role==='Job seeker'){
        return next(new ErrorHandler('Job seeker is not allowed to access this resources!',400))
    };
    const {id}=req.params;
    let job =await Job.findById(id)
    if(!job){
        return next(new ErrorHandler('Ops!!! job not found',404))
    }
    await Job.deleteOne();
    res.status(200).json({
        success:true,
        job,
        message: 'Job deleted successfully'
    })
})