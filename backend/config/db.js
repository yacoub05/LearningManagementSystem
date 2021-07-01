require ('dotenv').config()

const mongoose= require('mongoose');

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('MongoDB connection success')
    } catch (error) {
        console.error('MongoDB connection FAIL')
        process.exit(1)
    }
}

module.exports = connectDB