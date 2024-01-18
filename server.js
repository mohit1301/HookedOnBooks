if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const passport = require('passport')
const cookieParser = require('cookie-parser')

require('./dbConfig/config')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
const authRouter = require('./routes/auth')

require('./passport')
app.use(passport.initialize())

app.use(cookieParser())
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated() ?? false;
  next();
});

app.use('/home', passport.authenticate('jwt', { session: false }), indexRouter)
app.use('/authors', passport.authenticate('jwt', { session: false }), authorRouter)
app.use('/books', passport.authenticate('jwt', { session: false }), bookRouter)
app.use('/', authRouter)


app.listen(process.env.PORT || 3000)