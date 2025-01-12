import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"; //jwt
import mongoose from "mongoose";
import validator from "validator";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true,'Please provide your name'],
        minLength:[3,'name must contain at least 3 characters'],
        maxLength:[30,'name can not exceed 30 characters']
    },
    email:{
        type:String,
        required:[true,'Please provide your email'],
        validate:[validator.isEmail,'Please provide a valid email'],
        },
    phone:{
        type:Number,
        required:[true,'Please provide your phone number']
    },
    password:{
        type:String,
        required:[true,'Please provide your password'],
        minLength:[8,'name must contain at least 3 characters'],
        maxLength:[30,'name can not exceed 30 characters'],
        select:false
    },
    role:{
        type:String,
        required:[true,'Please provide your role'],
        enum:['Job seeker','Employer']
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

});
// Hashing the password:
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})
// comparing password:
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
// jwt token generate:
userSchema.methods.getJwtToken=function(){
return jwt.sign({id:this.id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE})
}
export const User=mongoose.model('User', userSchema)