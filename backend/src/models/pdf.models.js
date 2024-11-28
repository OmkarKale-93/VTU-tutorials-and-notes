import mongoose, {Schema} from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const pdfSchema = new Schema({
    pdfFile : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    category: {
        type: String,
        enum: ["engineering","mba","mca"],
        required : true 
    },
    scheme: {
        type: String,
        enum: ["2021","2022"],
        
    },
    sem: {
        type: String,
        enum: ["1","2","3","4","5","6","7","8"],
        
    },
    subjectName: {
        type: String,
        
    },
   
    views : {
        type : Number,
        default : 0
    },
    isPublished : {
        type : Boolean,
        default : true
    },
    owner : {
        type: Schema.Types.ObjectId,
        ref : "User"
        // type: String,
    }

},
{
    timestamps: true
}
)

// videoSchema.plugin(mongooseAggregatePaginate)

export const PDFFILES = mongoose.model("PDFFILES",pdfSchema)