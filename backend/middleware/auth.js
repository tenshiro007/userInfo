const jwt = require("jsonwebtoken");
const User = require("../models/user");

function extractToken (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}

verifyToken=async(req,res,next)=>{
    // console.log(extractToken(req));

    let token=req.headers["x-access-token"] ||req.body.token ||req.query.token ||extractToken(req)
    if(!token){
        return  res.status(403).send({
            message: "No token provided!"
        })
    }

    try{
        const decode=await jwt.verify(token,process.env.SECRET_KEY)
        
        req.user=decode
    }catch(err){
        return res.status(401).send({
            message: "Unauthorized"
          });
    }
    next()
}

module.exports=verifyToken