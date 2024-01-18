const express = require('express')
const router = express.Router()
const Book = require('../models/book')

router.use((req, res, next) => {
  req.app.set('layout', 'layouts/layout');
  next();
});


router.get('/', async (req, res) => {
  let books
  try {
    books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch(error) {
    books = []
    res.redirect('/dashboard', {errorMessage: 'An error ocurred'})
  }
  res.render('index', { books: books, isAuthenticated: req.isAuthenticated() })
})

module.exports = router