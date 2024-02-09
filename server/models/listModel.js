const mongoose = require('mongoose')


const ListSchema = new mongoose.Schema({
    application: String,
    account: String,
    password: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const ListModel = mongoose.model('List', ListSchema)
module.exports = ListModel