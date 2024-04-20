const mongoose = require('mongoose')


export const connectToDB = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error);
        
    }
}
