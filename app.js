const express = require('express');

const booksRoutes = require('./routes/books.routes');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(booksRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});