const UserModel = require('../models/authModel')
const {hashPassword, comparePassword} = require('../helpers/authHelper')
const jwt = require('jsonwebtoken')
const ListModel = require('../models/listModel')

const test = (req, res) => {
    res.json('Test is working')
}

const signupUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        if(!name){
            return res.json({
                error: 'Name is required'
            })
        }

        if(!password || password.length < 6){
            return res.json({
                error: 'Password incorrect and should be at least 6 characters'
            })
        }

        const emailExist = await UserModel.findOne({email})
        if(emailExist){
            return res.json({
                error: 'Email is taken already'
            })
        }

        const hashedPassword = await hashPassword(password);
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword
        })

        return res.json({
            user,
            message: 'Sign up successfully!'
        })
    } catch (error) {
        console.log(error)
    }
}


const signinUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        const user = await UserModel.findOne({email})
        if(!user){
           return res.json({
            error: 'No user exist'
           })
        }

        const correctPassword = await comparePassword(password, user.password)
        if(correctPassword){
            jwt.sign({
                id: user._id,
                name: user.name,
                email: user.email
            }, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token)
                .json({
                    user,
                    message: 'Sign in successfully!'
                })
            })
        }

        if(!correctPassword){
            return res.json({
                error: 'Password don\'t match'
            })
        }

    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req, res) => {

    const token = req.cookies.token;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
        
    } else{
        res.json(null)
    }
}

const signoutUser = (req, res) => {
    try {
        res.clearCookie('token')
        .json({ 
            message: 'Sign out successfully!' 
        });
    } catch (error) {
        console.error(error);
    }
};


module.exports = {
    test,
    signupUser,
    signinUser,
    getProfile,
    signoutUser
}