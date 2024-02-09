const express = require('express')
const { test, signupUser, signinUser, getProfile, signoutUser } = require('../controllers/authController')

const router = express.Router()

router.get('/', test)
router.post('/signup', signupUser)
router.post('/signin', signinUser)
router.get('/profile', getProfile)
router.post('/signout', signoutUser);

module.exports = router