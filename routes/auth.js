const express = require('express')
const User = require('../models/user')
const router = express.Router()
const { hashSync, compareSync } = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')
require('dotenv').config()

router.use((req, res, next) => {
    req.app.set('layout', 'layouts/authLayout');
    next();
});

router.get('/', (req, res) => {
    res.render('dashboard')
})

router.get('/register', (req, res) => {
    res.render('register')
})

// register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.render('register', {
            errorMessage: 'All fields (username, email, password) are required'
        })
    }
    const user = new User({
        username,
        email,
        password: hashSync(password, 10)
    })

    try {
        await user.save()
        res.render('login', {
            errorMessage: 'User Registered Successfully'
        })
    } catch {
        res.redirect('/', {
            errorMessage: 'An error occurred'
        })
    }
})

router.get('/login', (req, res) => {
    if (req.cookies.accessToken) {
        return res.redirect('/home');
    }
    res.render('login')
})

// login
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.render('register', {
            errorMessage: 'All fields (email, password) are required'
        })
    }

    const user = await User.findOne({ email: email })
    if (!user) {
        return res.render('login', {
            errorMessage: 'User does not exist'
        })
    }

    if (!compareSync(password, user.password)) {
        return res.render('login', {
            errorMessage: 'Invalid credentials'
        })
    }

    const jwtToken = jwt.sign({ userId: user._id.toString() }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' })
    res.cookie('accessToken', jwtToken, { httpOnly: true, secure: true })
    res.redirect('/home')
})

router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('accessToken');
    res.redirect('/');
});



module.exports = router