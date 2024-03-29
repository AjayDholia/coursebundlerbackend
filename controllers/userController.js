
import { catchAsyncError } from '../middleware/catchAsyncError.js'
import { User } from '../models/User.js';
import ErrorHandler from '../utils/errorHandler.js';
import { sendToken } from '../utils/sendToken.js';
export const register = catchAsyncError(async (req, res, next) => {

    const { name, email, password } = req.body;

    // const file = req.file;

    if (!name || !email || !password)
        return next(new ErrorHandler("Please Enter All Field ", 400));


    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 409));

    // upload file on cloudinary

    user = await User.create({
        name, email, password,
        avatar: {
            public_id: "tempid",
            url: "tempurl",
        }
    });

    sendToken(res, user, "Register Successfully", 201)
    // res.status(201).cookie("token",)
})

export const login = catchAsyncError(async (req, res, next) => {
    
    const {email, password } = req.body;

    // const file = req.file;

    if (!email || !password)
        return next(new ErrorHandler("Please Enter All Field ", 400));

    const user = await User.findOne({ email }).select("+password");
    
    if (!user) return next(new ErrorHandler("Incorrect Email or Password", 409));
    
    const isMatch = await user.comparePassword(password);
    console.log(isMatch);
    
  if (!isMatch) return next(new ErrorHandler("Incorrect Email or Password", 409));

    sendToken(res, user, `Welcome Back  ${user.name}`, 201);
})

export const logout = catchAsyncError(async(req,res,next)=>{
    res.status(200).cookie("token",null,{
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"Logged Out Successfully "
    })
})

export const getMyProfile = catchAsyncError(async(req,res,next)=>{
    console.log('test',req)
    const user = await User.findById(req.user._id);
    console.log(user,"userdata");
    res.status(200).json({
        success:true,
       user,
    })
})

export const changePassword = catchAsyncError(async(req,res,next)=>{
   const {oldPassword,newPassword} = req.body;
   
   if (!oldPassword || !newPassword)
   return next(new ErrorHandler("Please Enter All Field ", 400));

const user = await User.findById(req.user._id).select("+password");
   
const isMatch = await user.comparePassword(oldPassword);

if (!isMatch) return next(new ErrorHandler("Incorrect old Password", 409));

user.password = newPassword;

await user.save();

    res.status(200).json({
        success:true,
       message:"Password Change Successfully",
    })
})


export const updateProfile = catchAsyncError(async(req,res,next)=>{
    const {name,email} = req.body;
    
 
 const user = await User.findById(req.user._id);
 
if(name) user.name=name;
if(email) user.email = email
 
 await user.save();
 
     res.status(200).json({
         success:true,
        message:"Profile Updated Successfully",
     })
 })

 export const updateprofilepicture = catchAsyncError(async(req,res,next)=>{
    // Cloudinary TODO
    res.status(200).json({
        success:true,
        message:"Profile Picture Uploaded"
    })
 })