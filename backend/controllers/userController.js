const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = require('../model/userModel');
const asyncHandler = require('express-async-handler');
const userModel = require('../model/userModel');

// @desc       POST Register User
// @route      /api/users
// @access     Public
const registerUser = asyncHandler(async(req,res) => {

    const { name , email, password }  = req.body;
    if(!name || !password || !email) {
        res.status(400);
        throw new Error('Please add all the fields');
    }

    // Checking for existence of the user....
    const existUser = await userSchema.findOne({email});

    if(existUser) {
        res.status(400);
        throw new Error('User already exist...');
    }
    // Hash password....
    const hash = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,hash);
    const user = await userSchema.create({name,email,password:hashedPassword});
    if(!user) {
        res.json(400);
        throw new Error('Invalid user');
    }
    res.status(201);
    res.json({
        _id:user._id,
        name,
        email,
        token:genToken(user._id),
    });
})

// @desc        POST login User
// @route      /api/users/login
// @access     Public
const loginUser = asyncHandler(async(req,res) => {
    const { email, password } = req.body;
    const user = await userSchema.findOne({email});
    if(user && await bcrypt.compare(password,user.password)) {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email,
         token: genToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
})

// @desc       GET User Data
// @route      /api/users/me
// @access     Private
const getMe = asyncHandler(async(req,res) => {
    const { _id, name, email } = req.user;
    res.status(201).json({
        _id,name,email
    });
})

// Generate JWT Token
const genToken  = id => {
    return jwt.sign({ id },process.env.JWT_SECRET,{ expiresIn:'30d' })
}

module.exports =  {
    registerUser,
    loginUser,
    getMe
}