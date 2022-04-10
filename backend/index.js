// Authentication-App
// Register New Account
// Login 
// Login using --> Google & Github
// Signout
// Profile Details
// Edit Details in our DB
// Upload new Photo



// Connecting to Mongo DB
const connecttodb = require('./db'); 
connecttodb();

const express = require('express');
const app = express()
const port = 5000;
var cors = require('cors')
app.use(express.json())
app.use(cors())

// Write Routes here
app.use('/api/auth',require('./Routes/auth'));

// Listening to the Port
app.listen(port,()=>{
    console.log("Listening to Port-",port);
});