const mysql = require('mysql');
require('dotenv').config();

// Create a connection to the database
const connection = mysql.createConnection({
    // host: 'localhost:3306',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

// Function to insert data into the database
const insertUser = (email, location) => {
    const query = 'INSERT INTO users (email, location) VALUES (?, ?)';
    connection.query(query, [email, location], (err, results) => {
        if (err) {
            console.error('Error inserting data: ', err);
            connection.end(function(err) {
                if (err) {
                    console.error('Error connecting: ' + err.stack);
                }
            });
            return;
        }
        console.log('Data inserted, ID:', results.insertId);
    });
};

// Export the insertData function
module.exports = {
    insertUser
};