//require mongoose
import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config({ path:'./config/.env' });


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true});
        console.log('Mongo DB connected...')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB ; 