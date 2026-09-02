const mongoose=require('mongoose');

const dbConnect=async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected successfully!✅`)
    } catch (error) {
        console.log(`mongodb connection failed❌`)
    }
}

module.exports={
    dbConnect
}