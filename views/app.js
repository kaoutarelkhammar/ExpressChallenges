const express = require('express');
const app = express();
const ejs = require('ejs'); // Require EJS

// Set EJS as the view engine
app.set('view engine', 'ejs');


let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];

// Render the home page using the 'home.ejs' template and pass the 'products' array
app.get('/', (req, res) => {
    res.render('home', { products });
  });
  
  // Render the product details page using the 'productDetails.ejs' template and pass the product details
  app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);
  
    if (!product) {
      // If the product is not found, render an error page (create an 'error.ejs' template)
      res.status(404).render('error', { message: 'Product not found' });
    } else {
      res.render('productDetails', { product });
    }
  });

app.listen(3000)  