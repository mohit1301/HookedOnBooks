require('dotenv').config()
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const PORT = process.env.AUTHOR_PORT || 3001
require('./dbConfig/config')
const getNewAccessToken = require('../middleware/getNewAccessToken')

const passport = require('../passport')
app.use(passport.initialize())

app.use(cookieParser())
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', process.cwd() + '/views')
app.set('layout', 'layouts/layout')
app.use(methodOverride('_method'))
app.use(express.static(process.cwd() + '/public'))
app.use(express.urlencoded({ limit: '10mb', extended: false }))

const authorRouter = require('./routes/authorRoutes')

app.use(passport.authenticate('jwt', { session: false }));

app.use(getNewAccessToken)

app.use('/authors', authorRouter)

app.listen(PORT, ()=>{
    console.log(`Author service is running on port ${PORT}`)
})