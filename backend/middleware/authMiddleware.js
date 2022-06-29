const asyncHandler = require('express-async-handler');
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');

const protect = asyncHandler(async(req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token,process.env.JWT_SECRET);

            // GET user Id for the token
            req.user = await userModel.findOne({_id:decode.id}).select('-password');
            next();
        }
        catch(err) {
            console.log(err.message);
            res.status(401);
            throw new Error('Not authorized.');
        }
    }
    if(!token) {
        res.status(401);
        throw new Error('Not authorized , no token');
    }
})
module.exports = { protect };