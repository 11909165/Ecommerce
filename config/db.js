import mongoose from "mongoose"
import colors from "colors"
// Connect DB
const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.mongo_url);
        console.log(`Connected to MongoDB database ${conn.connection.host}`);
    } catch(error){
        console.log(`Error in MongoDB ${error}`.bgRed.white);
    }
}

export default connectDB; 