const jwt = require("jsonwebtoken");
const JWT_SECRET = 'RONY%12@34#56$78'

// Middleware is nothing but a function which takes req,res,next as arguements
// next is used to call the next function defined after this function is called
const fetchuser = (req,res,next)=>{
    // Get the userid from the jwt token and add to id to req object
    // We extract the authentication-token part from the header of req
    const token = req.header("authentication-token");
    if(!token){
        res.status(401).send({"error":"Please authenticate using a valid token!"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({"error":"Please authenticate using a valid token!"})
    }
    
}

module.exports = fetchuser;