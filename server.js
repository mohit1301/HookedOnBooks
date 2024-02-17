require('dotenv').load()
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({ limit: '10mb', extended: false }))

require('./auth-service/server')
require('./book-service/server')
require('./author-service/server')

app.get('/', (req, res) =>{
  res.render('mainPage')
})

app.listen(8080, ()=>{
  console.log(`Main server listening on port 8080 `)
})