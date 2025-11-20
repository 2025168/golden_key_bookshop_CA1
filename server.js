const express = require('express');
const path = require('path');
const db = require('./database');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  // Get bestseller books
  db.query(`
    SELECT * FROM books 
    WHERE badge IN ('Bestseller', 'New', 'Sale')
    ORDER BY CASE 
      WHEN badge = 'Bestseller' THEN 1
      WHEN badge = 'New' THEN 2
      WHEN badge = 'Sale' THEN 3
      ELSE 4
    END
    LIMIT 5
  `, (err, results) => {
    if (err) {
      console.error(err);
      return res.send('Database error');
    }
    res.render('index', { 
      title: 'GK Bookshop',
      books: results 
    });
  });
});

app.get('/products', (req, res) => {
  const category = req.query.category || 'all';
  
  let query = 'SELECT * FROM books';
  let params = [];
  
  if (category !== 'all') {
    query += ' WHERE category = ?';
    params.push(category);
  }
  
  db.query(query, params, (err, books) => {
    if (err) {
      console.error(err);
      return res.send('Database error');
    }
    
    // Get categories for filter
    db.query('SELECT DISTINCT category FROM books WHERE category IS NOT NULL', (err, categories) => {
      if (err) {
        console.error(err);
        return res.send('Database error');
      }
      
      res.render('products', { 
        title: 'Products - GK Bookshop',
        books: books,
        categories: categories,
        currentCategory: category
      });
    });
  });
});

app.post('/add-to-cart', (req, res) => {
  const { bookId } = req.body;
  // Simple cart implementation (store in session or cookie)
  res.json({ success: true, message: 'Added to cart!' });
});

// About and Contact pages (static for now)
app.get('/about', (req, res) => {
  res.render('about', { title: 'About - GK Bookshop' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact - GK Bookshop' });
});

app.listen(PORT, () => {
  console.log(`Bookshop running at http://localhost:${PORT}`);
});