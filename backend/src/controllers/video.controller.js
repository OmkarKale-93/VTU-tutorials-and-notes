import ErrorHandler from "../middlewares/error.js";
import {Video}  from "../models/video.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


export const uploadVideo = async(req,res,next) =>{
    try {
        const  {title, description, category } = req.body;
        if (
            [title, description, category].some((field)=>
            field?.trim() === "") 
            ){
                return next(new ErrorHandler("Fill all details",400));
            }
        
            const videoLocalPath = req.files?.videoFile[0]?.path;
            const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
            if(!videoLocalPath){
                throw new ErrorHandler("video file is required",400);
            }
            if(!thumbnailLocalPath){
                throw new ErrorHandler("Thumbnail file is required",400);
                }
            const videoFile = await uploadOnCloudinary(videoLocalPath);
            const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
            console.log(videoFile.url);

            if (!videoFile) throw new ErrorHandler("video file doesn't exist",404);
            if (!thumbnail) throw new ErrorHandler("thumbnail file doesn't exist",404);
            console.log(videoFile.url)
            const video = await Video.create({
                title,
                description,
                category,
                videoFile : videoFile.url,
                thumbnail : thumbnail.url
                });

            res.status(200).json({
                success : true,
                video
            })
        
    } catch (error) {
     console.log(error)   
    }
}

export const getVideos = async (req,res) =>{
    try {
        const video = await Video.find();
        // return res.status(200).json({
        //      video
        //     })
        res.send(video)
    } catch (error) {
        console.log(error)
    }
}

export const getPerticularVideo = async (req,res) =>{
    try {
        const video = await Video.findById(req.params.id);
        res.send(video)
    } catch (error) {
        console.log(error)
    }
}

export const Search = async(req,res,next) =>{
    const searchTerm = req.query.q;  
  
    try {  
      // Perform MongoDB search using regular expression  
      const videos = await Video.find({  
        $or: [  
          { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search on 'name' field  
          { category: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search on 'description' field  

        ]  
      });  
  
      res.json(videos);  
    } catch (err) {  
      console.error('Search error:', err);  
      res.status(500).json({ error: 'Search failed' });  
    }  
}
