const express = require('express');
const app = express();

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
    const { name, price } = req.body;
  
    // Validate input
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }
  
    // Generate a unique ID for the new product
    const newProductId = products.length + 1;
  
    // Create the new product object
    const newProduct = {
      id: newProductId,
      name,
      price: parseFloat(price),
    };
  
    // Add the new product to the array
    products.push(newProduct);
  
    // Return the newly created product
    res.status(201).json(newProduct);
  });

  //PUT /products
  app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;
  
    // Find the product to update
    const productIndex = products.findIndex((p) => p.id === productId);
  
    if (productIndex === -1) {
      // If the product is not found, return an error response
      res.status(404).json({ error: 'Product not found' });
    } else {
      // Update the product details
      products[productIndex].name = name || products[productIndex].name;
      products[productIndex].price = parseFloat(price) || products[productIndex].price;
  
      // Return the updated product
      res.json(products[productIndex]);
    }
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
  

  const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
