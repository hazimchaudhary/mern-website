import mongoose from 'mongoose'; 


// Connection to Monogo Db with .ENV
const connectDB= async ()=>{
    try {
        const conn= await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Mongodb Database ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in Mongo DB ${error}`)  
    }
};

export default connectDB; 