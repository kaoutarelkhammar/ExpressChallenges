const express = require('express');
const app = express();
const port = 3000;

// Define a route handler for the root URL (/) that sends a simple response
app.get('/', (req, res) => {
  res.send('Welcome to my Express.js server!');
});

// Start the server and listen on port 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
