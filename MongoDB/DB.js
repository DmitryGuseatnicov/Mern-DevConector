const mongoose = require('mongoose')
const config = require('config')

const mangoURI = config.get("mongoURI")

const connectDB = async () =>{
    try{
        await mongoose.connect(mangoURI, {
             useNewUrlParser: true,
             useCreateIndex:true,
             useFindAndModify: false
            })
        console.log('MongoDb Connect...')
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB