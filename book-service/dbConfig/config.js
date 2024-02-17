// require('dotenv').config({ path: './book-service/.env' })
require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_BOOK_URL)
.then(()=>{
    console.log("connected to books database")
})
.catch((err)=>{
    console.log(err)
})

// dbConfig/booksDB.js
// const mongoose = require('mongoose');
// require('dotenv').config({ path: './books-service/.env' });

// const booksDB = mongoose.createConnection(process.env.MONGODB_BOOK_URL);

// booksDB.on('error', err => {
//     console.error('Books DB Connection Error:', err);
// });

// booksDB.once('open', () => {
//     console.log('Connected to Books DB');
// });

// module.exports = booksDB;
