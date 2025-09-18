const AuthService = require("../services/auth.service");

const register = async(req, res) => {
    try{
        const{fullName, email, password, role} = req.body;

        if(!fullName || !email || !password){
            return res.status(400).json({message: "Please fill all required fields"});
        }
        await AuthService.registerUser({fullName, email, password, role});
        res.status(201).json({message: "User registered successfully"});
    }catch(error){
        res.status(500).json({message:"Server Error", error: error.message});
    }
}

const login = async(req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "Email and password are required"});
        }

        const {user, token} = await AuthService.loginUser({email, password})
        res.status(200).json({message: "Login successful", token, user});
    }catch(error){
        res.status(500).json({message: "Server Error", error: error.message});
    }
}

const getProfile = async(req, res) => {
    res.json(req.user)
}
module.exports = {register, login, getProfile}