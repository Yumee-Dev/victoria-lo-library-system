const express = require('express');

const booksController = require('../controllers/books.controller');

const router = express.Router();

router.get('/', booksController.getMain);

router.get('/all', booksController.getAllBooks);

router.post('/add', booksController.addBook);

router.delete('/delete', booksController.deleteBook);

module.exports = router;