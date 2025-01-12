import { catchAsyncErrors } from '../middlewares/catchAscynError.js';
import ErrorHandler from '../middlewares/error.js';
import { User } from '../models/userSchema.js';
import { sendToken } from '../utilis/jwtToken.js';
export const register=catchAsyncErrors(async (req,res,next)=>{
    const {name,email,phone,password,role} = req.body;
    console.log(req.body)
    if(!name || !email || !password || !phone || !role){
    return next(new ErrorHandler('Please fill full registration form'))
    }
    const isEmail =await User.findOne({email})
    if(isEmail){
    return next(new ErrorHandler('Email already exists'))
    }
    const user=await User.create({
        name,
        email,
        phone,
        password,
        role,
    });
    sendToken(user,201,res,'User registered successfully');
})
export const login=catchAsyncErrors(async(req,res,next)=>{
    const {email,password,role}=req.body;
    if( !email || !password || !role){
        return next(new ErrorHandler('Please provide email, password and role',400))
    }
    const user=await User.findOne({email}).select("+password")//get password
    if(!user){
        return next(new ErrorHandler('Invalid email or password',400))
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid email or password',400))}
    if(user.role!==role){
        return next(new ErrorHandler('User with this role not found',404))
    }
    sendToken(user,201,res,'User logged in successfully!')
})
export const logout = catchAsyncErrors(async (req, res, next) => {
    res.status(200)
        .cookie("token", null, {
            httpOnly: true,
            expires: new Date(Date.now()),
            path: '/'
        })
        .json({
            success: true,
            message: 'User logged out successfully!'
        });
});