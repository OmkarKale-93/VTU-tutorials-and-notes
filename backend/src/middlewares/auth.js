
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const isAuthenticated = async(req,res,next)=>{
    const {token} = req.cookies;
    
    if(!token)
        return res.status(404).json({
            success : false,
            message : "User not logged",
        })

    const id = jwt.decode(token,process.env.JWT_SECRET);

    req.user = await User.findById(id).select("-password");

    res.status(200).json({
        success: true,
        user: req.user
    })
}