const jwt = require('jsonwebtoken');
const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const {JWT_SECRET} = process.env;

const registerUser = async({fullName, email, password, role}) => {
    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new Error("User already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
        role: role || 'user',
    })

    await newUser.save();
    return newUser;

}
const loginUser = async({email, password}) => {
    const user = await User.findOne({email});

    if(!user) throw new Error("No user exists with this email");

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error("Password Mismatch");

    const token = jwt.sign(
        {id: user._id, email: user.email},
        JWT_SECRET,
        {expiresIn: '1h'}
    );

    return{user, token};
}
module.exports = {registerUser, loginUser}