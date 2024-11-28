import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendCookie } from "../utils/feature.js";
import bcrypt from 'bcrypt'



export const registerUser = async (req,res,next) =>{
   try {
    const { email, username, password } = req.body;

    if (
        [email, username, password].some((field)=>
        field?.trim() === "") 
        ){
            return next(new ErrorHandler("Fill all details",400));
        }
    
    let user = await User.findOne({email});

    if (user) return next(new ErrorHandler("User already exists",400));

    // console.log(avatar.url)
        
     user = await User.create(
        {
           
            username: username.toLowerCase(),
            email,
            password,
        }
    )

    sendCookie(user, res,"registered successfully",201);

    // return res.status(200).json({
    //     success : true,
    //     user,
    // }).end();
    

   } catch (error) {
        return console.log("error in registering ",error);
   }
}

export const loginUser = async(req,res,next) =>{
    try {
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user) throw new ErrorHandler("User not found",404);

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch) throw new ErrorHandler("password doesn't match",404);

    sendCookie(user,res,`Welcome back ${user.username}`, 201);
    // res.send(user);
    }catch(error){
        console.log(error);
    }

}

export const logout = async(req,res)=>{
    try {
     res.status(200).cookie("token","",{
         expires : new Date(Date.now())
     }).json({
         success : true,
         message : "logged out successfully",
     })
    } catch (error) {
     next(error)
    }
 }

 export const getCookies = async(req,res) =>{
    try {
        const token = req.cookies.token;
        console.log(token)
        if(!token) return res.status(200).json({success : false, message : "no token found"})
        res.status(201).json({
            token,
        })
            }catch(error){
                console.log(error)
                }
 }

 export const getAboutYourself = async(req,res) =>{
    try {
        const token = req.cookies.token;
        const id = await jwt.decode(token,process.env.JWT_SECRET);
        const user = await User.findById(id).select("-password");
        res.status(200).json(user);
        } catch (error) {
            console.log(error);
            }
 }