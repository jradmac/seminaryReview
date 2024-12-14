const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes'); // Adjust path if necessary

const app = express();
const port = 3000; // Change this to the port you want

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // For form submissions
app.use(bodyParser.json()); // For JSON payloads
app.set('view engine', 'ejs'); // Use EJS for rendering views

// Routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Logs the link to the terminal
});
