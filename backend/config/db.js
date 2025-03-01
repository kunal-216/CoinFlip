import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URI)
        if(response){
            console.log("MongoDb Connected");
        }
    } catch (error) {
        console.error(error)
    }
}

export default connectDB;