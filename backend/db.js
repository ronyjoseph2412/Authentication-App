// Using Moongose to CONNECT TO DB. 
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/auth?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

const connecttodb= ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Database");
    })
}

module.exports = connecttodb;

