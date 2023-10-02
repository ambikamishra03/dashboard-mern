const mongoose= require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const URL = process.env.URL;


const mongoDB = async () =>{
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          console.log("connected to database");
    } catch (error) {
        console.log("Error while connecting");
    }
}

module.exports = mongoDB;