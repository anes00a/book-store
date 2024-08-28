import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

// Home Page
router.get('/', (req, res) => {
  res.render('home');
});

// Shop Page
router.get('/shop', async (req, res) => {
  try {
    const books = await Book.find();
    res.render('shop', { books });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Buy Page
router.get('/buy/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.render('buy', { book });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Insert New Product Page
router.get('/insert', (req, res) => {
  res.render('insert');
});

router.post('/insert', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.redirect('/books/shop');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

export default router;
