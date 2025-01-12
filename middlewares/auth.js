import jwt from 'jsonwebtoken';
import { User } from '../models/userSchema.js';
import { catchAsyncErrors } from './catchAscynError.js';
import ErrorHandler from "./error.js";
export const isAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler('User not Authorized',401))
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY) //USER SAVED
    req.user=await User.findById(decoded.id);
    next();
})