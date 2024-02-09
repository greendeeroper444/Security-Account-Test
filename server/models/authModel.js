const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email:{
        type: String,
        unique: true
    },
    password: String,
    image: String
})

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel