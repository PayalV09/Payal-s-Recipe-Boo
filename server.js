const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Set up MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'payal2003', // Replace with your MySQL password
  database: 'recipebook',
  port: 3306
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database');
});

// API route to fetch recipes
app.get('/recipes', (req, res) => {
  connection.query('SELECT * FROM recipes', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});



// API route to add a new recipe
app.post('/recipes', (req, res) => {
  const newRecipe = req.body;
  const query = 'INSERT INTO recipes (title, ingredients, instructions) VALUES (?, ?, ?)';

  connection.query(query, [newRecipe.title, newRecipe.ingredients, newRecipe.instructions], (err, results) => {
      if (err) {
          return res.status(500).send(err);
      }
      // Return the new recipe with its ID
      newRecipe.id = results.insertId;
      res.status(201).json(newRecipe);
  });
});


// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Recipe Book API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.use(express.static('public'));
