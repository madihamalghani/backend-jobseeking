import mongoose from "mongoose";
import validator from "validator";
const applicationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide your name'],
        minLength:[8,'name must contain at least 8 characters'],
        maxLength:[30,'name can not exceed 30 characters'],
},
    email:{
    type:String,
    required:[true,'Please provide your email'],
    validate:[validator.isEmail,'Please provide a valid email'],
    }, 
    coverLetter:{
        type:String,
        required:[true,'Please write coverLetter'],        
    },
    phone:{
        type:Number,
        required:[true,'Please provide your phone number']
    },
    address:{
        type:String,
    },
    resume:{   //to store resume details
        public_id:{ //Stores a unique identifier for the uploaded resume
            type:String,
            required:true
        },
        url:{  //Stores the URL where the resume can be accessed.
            type:String,
            required:true
        },
        
    },
    applicantID:{// connects the application to a specific user
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
                },
        role:{
            type:String,
            enum:['Job seeker'],
            required:true
        }
    },
    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
                },
        role:{
            type:String,
            enum:['Employer'],
            required:true
        }
    }
})
export const Application=mongoose.model("Application",applicationSchema)