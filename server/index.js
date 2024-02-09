const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const middleware = require('./middleware/middleware')

const app = express()

//middleware
app.use(middleware);

//connection to mongodb
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database not connected', err))

//connection to routes
app.use('/', require('./routes/authRoute'));   
app.use('/lists', require('./routes/listRoute'));   

const port = 8000;
app.listen(port, () => console.log(`Server is running on ${port}`))