import mongoose from "mongoose";
const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required: [true,'Please provide job title'],
        minLength:[3,'name must contain at least 3 characters'],
        maxLength:[50,'name can not exceed 50 characters']

    },
    description:{
        type:String,
        required: [true,'Please provide your job description'],
        minLength:[50,'name must contain at least 50 characters'],
        maxLength:[350,'name can not exceed 350 characters']
    },
    category:{
        type:String,
        required: [true,'Please provide your job category'],

    },
    country:{
        type:String,
        required: [true,'In which country do you live? Please fill this'],
    },
    city:{
        type:String,
        required: [true,'In which city do you live? Please fill this']
    },
    location:{
        type:String,
        required: [true,'Please provide exact location'],
        minLength:[20,'location must contain at least 20 characters'],
    },
    fixedSalary:{
        type:Number,
        minLength:[4,'Fixed salary must contain at least 4 digits'],
        maxLength:[9,'Fixed salary can not exceed 9 digits']
    },
    salaryForm:{
        type:Number,
        minLength:[4,'Salary starts from 1000 '],
        maxLength:[9,'Salary ends at 999999999']
    },
    expired:{
        type:Boolean,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now(),
    },
    postedBy:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: 'true'
    }

})
export const Job=mongoose.model("Job",jobSchema)