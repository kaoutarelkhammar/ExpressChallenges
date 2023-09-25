const express = require('express');
const app = express();
const port = 3000;

// Custom logging middleware
const loggingMiddleware = (req, res, next) => {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.url;

  const logMessage = `[${timestamp}] ${method} ${url}`;

  // Log to the console
  console.log(logMessage);

  app.use(loggingMiddleware); 
  app.use(express.json());
  
  let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];

 // Get all products
 app.get('/products', (req, res) => {
    res.json(products);
  });

//Get product by ID
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);
    
    if (!product) {
      // If the product is not found, return an error response
      res.status(404).json({ error: 'Product not found' });
    } else {
      // If the product is found, return its details
      res.json(product);
    }
  });

//Search products
app.get('/products/search', (req, res) => {
    const { q, minPrice, maxPrice } = req.query;
  
    // Filter products based on query parameters
    const filteredProducts = products.filter((product) => {
      const matchesQuery = !q || product.name.toLowerCase().includes(q.toLowerCase());
      const withinPriceRange = (!minPrice || product.price >= parseFloat(minPrice)) &&
                              (!maxPrice || product.price <= parseFloat(maxPrice));
      return matchesQuery && withinPriceRange;
    });
  
    // Return the filtered products
    res.json(filteredProducts);
  });

  //POST /products 
 
app.post('/products', (req, res) => {
    const product = req.body;
    if (!product.name) {
        return res.status(400).send('Please provide full information of the product.');
    }
    product.id = products.length + 1;
    products.push(product);
    res.status(201).send(product);
});

app.put('/products/:id', (req, res) => {
    let id = Number(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).send('Product with the provided ID not found.');
    }
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    res.send(product);
});

 //DELETE /products
 app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
  
    // Find the index of the product to delete
    const productIndex = products.findIndex((p) => p.id === productId);
  
    if (productIndex === -1) {
      // If the product is not found, return an error response
      res.status(404).json({ error: 'Product not found' });
    } else {
      // Remove the product from the array
      products.splice(productIndex, 1);
  
      // Return a success message
      res.json({ message: 'Product deleted successfully' });
    }
  });
  

// Error handling middleware
const errorHandlingMiddleware = (err, req, res, next) => {
  console.error(err);

  // Send a user-friendly error response
  res.status(500).send('Sorry, something went wrong on our end.');
};

// Use the logging middleware for all routes
app.use(loggingMiddleware);

// Define a route handler that intentionally causes an error
app.get('/error', (req, res, next) => {
  // Simulate an error
  const err = new Error('This is a simulated error.');
  next(err);
});

// Apply the error handling middleware
app.use(errorHandlingMiddleware);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
}
