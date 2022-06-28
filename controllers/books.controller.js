const Book = require('../models/book.model');

function getMain(req, res, next) {
  res.render('index');
}

function getAllBooks(req, res, next) {
  Book.getAllBooks().then(data => res.json(data));
}

async function addBook(req, res, next) {
  for (const key in req.body) {
    if (req.body[key].trim() === '') {
      return res.json({
        error: true,
        errorMessage: 'Input values are not filled!'
      });    
    }
    if (!/^[a-z'!:;\.\-\,\?\d\s]*$/i.test(req.body[key]) || ['drop', 'delete'].some(element => req.body[key].toLowerCase().includes(element))) {
      return res.json({
        error: true,
        errorMessage: 'Invalid input values!'
      });
    }
  }
  const book = new Book(null, req.body.title, req.body.author, req.body.annotation, req.body.published);
  try {
    const saveResult = await book.save();
    return res.json({
      error: false,
      result: saveResult,
      id: book.id
    });
  } catch (error) {
    res.json({
      error: true,
      errorMessage: 'Something wrong with database!'
    });
  }
}

async function deleteBook(req, res, next) {
// TURN ON LATER
  // return res.json({
  //   error: true,
  //   errorMessage: 'Deleting prohibited!'
  // });
/////////////////
  
  if (!req.body.id) {
    return res.json({
      error: true,
      errorMessage: 'ID undefined!'
    });
  }
  const book = new Book(req.body.id, null, null, null, null);
  try {
    const deleteResult = await book.delete();
    return res.json({
      error: false,
      result: deleteResult,
      id: book.id
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: true,
      errorMessage: 'Something wrong with database!'
    });
  }
}

module.exports = {
  getMain: getMain,
  getAllBooks: getAllBooks,
  addBook: addBook,
  deleteBook: deleteBook
};