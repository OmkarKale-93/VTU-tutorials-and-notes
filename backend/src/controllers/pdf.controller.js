import ErrorHandler from "../middlewares/error.js";
import { PDFFILES } from "../models/pdf.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


export const pdfUpload  = async(req,res,next) =>{
    try {
        const  {title, description, category,scheme,sem,subjectName} = req.body;
        if (
            [title, description, category,scheme,sem,subjectName].some((field)=>
            field?.trim() === "") 
            ){
                return next(new ErrorHandler("Fill all details",400));
            }
        
            const pdfLocalPath = req.files?.pdfFile[0]?.path;

            if(!pdfLocalPath)  throw new ErrorHandler("pdf file is required",400);

            const pdf = await uploadOnCloudinary(pdfLocalPath);
            if(!pdf) throw new ErrorHandler("pdf is unable to upload on cloudinary",404)

            const pdfDetails = await PDFFILES.create({
                title,
                description,
                category,
                scheme,
                sem,
                subjectName,
                pdfFile : pdf.url
            })
        
        res.status(200).json({
            success:true,
            data:pdfDetails
        })
    } catch (error) {
        console.log(error);
    }
}


export const getpdfs = async(req,res,next) =>{
    try {
        const pdfs = await PDFFILES.find();
        return res.status(200).json({
            pdfs
            })
        // res.send([video)
    } catch (error) {
     console.log(error)   
    }
} 

export const getPerticularNotes = async(req,res) =>{
    try {
        const pdfs = await PDFFILES.findById(req.params.id);
        res.send(pdfs)
        } catch (error) {
            console.log(error)
            }
}