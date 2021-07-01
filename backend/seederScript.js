// require('dotenv').config()

// const productsData = require('./data/product')
// const connectDB = require('./config/db')
// const Product = require('./models/Product')

// connectDB()

// const importData =async ()=>{
//     try {

//         await Product.deleteMany({})

//         await Product.insertMany(productsData)

//         console.log('Data Import Success')

//         process.exit()
        
//     } catch (error) {
//         console.error('error with data imports')
//         process.exit(1)
        
//     }
     
// };

// importData()