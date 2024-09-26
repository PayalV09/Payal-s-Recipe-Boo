const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',    // Replace with your host if it's not local
  user: 'root',         // Your MySQL username
  password: 'payal2003', // Your MySQL password
  database: 'recipebook' // The name of your database created in MySQL Workbench
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database as ID', connection.threadId);
});

// Example: Query the recipes table
connection.query('SELECT * FROM recipes', (err, results, fields) => {
  if (err) {
    console.error('Error fetching data:', err.stack);
  } else {
    console.log('Data from recipes table:', results);
  }
  connection.end(); // Close the connection when done
});

