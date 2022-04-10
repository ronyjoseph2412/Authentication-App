const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchuser');

const JWT_SECRET ='RONY%12@34#56$78'



// Create User using --> Manual Sign in 
router.post('/createuser',[body(['email','Enter a valid Email']).isEmail(),body('password', 'Password must be of minimum 5 characters').isLength({ min: 5 })],async (req,res)=>{
    try{
        // If there are validation errors send bad request!
        // console.log(req.body.email);
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        // Check whether the same email exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return (res.status(400).json({ "error": "User already exists! Please enter a valid email-address." }))
        }
        // Securing the Password
        // Generating Salt to protect the password by hashing
        const salt = await bcrypt.genSalt(10);
        const secure_Pass = await bcrypt.hash(req.body.password,salt);
        let name = ""
        if(req.body.email != ""){
            name = (req.body.email.split("@"))[0]; 
            console.log(name);
        }
        // Creating User
        user  = await User.create({
            name:name,
            email:req.body.email,
            password:secure_Pass,
            bio:"",
            phone:"",
            photo:"",
        });
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({'authToken':authToken});
    }catch(err){
        console.error(err.message);
        res.status(500).json({ 'error': 'some error occured' });
    }
});

router.post('/login', [body('email', 'Enter a valid Email').isEmail(), body('password', 'Password cannot be blank').exists()], async (req, res) => {
    // If there are validation errors send bad request!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        // Finding from DB is asynchrous add await!
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ "error": "Please try again or create an account using the Sign-Up Portal!" })
        }
        const passwordComapare = await bcrypt.compare(password, user.password);
        if (!passwordComapare) {
            return res.status(400).json({ "error": "Please try again or create an account using the Sign-Up Portal!" })
        }
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log();
        res.json({ "authToken": authToken });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ 'error': 'Internal error occured' });
    }

});
// ROUTE 3
// Using Middleware for Fetching user-data
// Fetching the user-data from db {Login Required}
// My auth token consists of id since we passed to during user creation
router.post('/getuser',fetchuser,async (req, res) => {
    try {
        userId = req.user.id;
        console.log(userId)
        const user = await User.findById(userId).select("-password");
        console.log(user);
        res.send(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 'error': 'Internal error occured' });
    }
});
// ROUTE 4 {Incomplete(Correct Photo editing)}
// Using Middleware for Editing user-data
// Fetching the user-data from db {Login Required}
// My auth token consists of id since we passed to during user creation
router.put('/edituser',fetchuser,async (req, res) => {
    try {
        
        const {name,bio,phone,email,photo} = req.body;
        
        userId = req.user.id;
        user_data = {}
        user_data.name = name
        user_data.bio = bio
        user_data.phone = phone
        user_data.email = email
        user_data.photo = photo
        console.log(req.body);
        // let user = await User.findById(userId).select("-password");
        user = await User.findByIdAndUpdate(req.user.id,{$set:user_data},{new:true});
        res.json(user_data);


    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 'error': 'Internal error occured' });
    }
});

// ROUTE-5 Github Login 
// router.post('/gituser',async (req,res)=>{
//     try{
//         let user = await User.findOne({ email: req.body.email });
//         if (user) {
//             return (res.status(400).json({ "error": "User already exists! Please enter a valid email-address." }))
//         }
//         // Securing the Password
//         // Generating Salt to protect the password by hashing
//         const salt = await bcrypt.genSalt(10);
//         const secure_Pass = await bcrypt.hash(req.body.password,salt);
//         let name = ""
//         if(req.body.email != ""){
//             name = (req.body.email.split("@"))[0]; 
//             console.log(name);
//         }
//         // Creating User
//         user  = await User.create({
//             name:name,
//             email:req.body.email,
//             password:secure_Pass,
//         });
//         const data = {
//             user:{
//                 id:user.id
//             }
//         }
//         const authToken = jwt.sign(data, JWT_SECRET);
//         res.json({'authToken':authToken});
//     }catch(err){
//         console.error(err.message);
//         res.status(500).json({ 'error': 'some error occured' });
//     }
// });



// ROUTE-6 Google Login 
router.post('/guser',async (req,res)=>{
    try{
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            let { email, password } = req.body;
            password = req.body.password;
            password = password.split("");
            password = password.reverse();
            password = password.join("");
            
    try {
        // Finding from DB is asynchrous add await!
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ "error": "Please try again or create an account using the Sign-Up Portal!" })
        }
        const passwordComapare = await bcrypt.compare(password, user.password);
        if (!passwordComapare) {
            return res.status(400).json({ "error": "Please try again or create an account using the Sign-Up Portal!" })
        }
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log("Alreaxy");
        res.json({ "authToken": authToken });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ 'error': 'Internal error occured' });
    }
        }
    else{
        // Securing the Password
        // Generating Salt to protect the password by hashing
        const salt = await bcrypt.genSalt(10);
        password = req.body.password;
        password = password.split("");
        password = password.reverse();
        password = password.join("");
        const secure_Pass = await bcrypt.hash(password,salt);
        let name = ""
        if(req.body.email != ""){
            name = (req.body.name); 
            console.log(name);
        }
        // Creating User
        user  = await User.create({
            name:name,
            email:req.body.email,
            password:secure_Pass,
            bio:"",
            phone:"",
            photo:req.body.photo,
        });
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({'authToken':authToken});
    }
}catch(err){
    console.error(err.message);
    res.status(500).json({ 'error': 'some error occured' });
}
}
);

module.exports = router;
