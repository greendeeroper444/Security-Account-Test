const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const middleware = express();

middleware.use(express.json());
middleware.use(express.urlencoded({ extended: false }));
middleware.use(cookieParser());

//CORS middleware
middleware.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);

module.exports = middleware;