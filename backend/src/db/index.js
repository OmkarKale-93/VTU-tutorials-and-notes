import mongoose from "mongoose";


const connnecDb = async() => {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    }catch(err){
        console.log("Unable to connect to database",err)
    }
}

export default connnecDb;