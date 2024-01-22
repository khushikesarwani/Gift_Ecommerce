import mongoose from "mongoose";


const connectDB= async ()=>{
try{
    const conn= await mongoose.connect(process.env.MONGO_URL);
    console.log(`ok connected to mongoDB database ${conn.connection.host}`.bgMagenta.white);

} catch(error){
    console.log("ERROR OCCURED:"+error);
}
}

export default connectDB;