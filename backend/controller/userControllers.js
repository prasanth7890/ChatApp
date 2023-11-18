const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }

    let picture;
    if(req.file) {
        picture = req.file.path;        
    }

    // if user exists in db or not
    const userExists = await User.findOne({email});
    if(userExists) {
        res.status(400);
        throw new Error("User Already Exists");
    }

    const user = await User.create({
        name,
        email,
        password, 
        picture,
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.picture,
            token: generateToken(user._id),
        });
    } else {
        res.status(400)
        throw new Error("Failed to create the user");
    }
});


const authUser = asyncHandler(async (req, res)=> {
    const {email, password} =  req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.picture,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
});


module.exports = {registerUser, authUser};