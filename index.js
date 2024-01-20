const express = require('express')
const app = express();
const path = require('path');
const { ConnectionPool } = require('mssql');
const port = 3000;

// Database configuration
const config = {
    server: 'jan15bootcampserver.database.windows.net',
    user: 'bootcamp',
    password: 'Pass@123',
    database: 'jan15bootcampdb', // Replace with your actual database name
    options: {
        encrypt: true
    }
};

// Create a connection pool
const pool = new ConnectionPool(config);

// Handle errors
pool.connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
});

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/',  (req, res) => {
    res.render('home.ejs');
});








app.get('/task2', async (req, res) => {
    // Check if the connection pool is connected
    if (pool.connected) {
      // Fetching data for task2 (replace the query with your actual query)
      try {
        const result = await pool.query('SELECT TOP 20 * FROM SalesLT.Customer');
        console.log('Query executed successfully for task2. Row count:', result.rowsAffected[0]);
        // Assuming you want to render the task2.ejs template
        res.render('task2.ejs', { customers: result.recordset });
      } catch (err) {
        console.error('Error executing SQL query for task2:', err);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.status(500).send('Not connected to the database');
    }
});

app.get('/task3', async(req, res) => {
    if(pool.connected){
        try{
                    const result=await pool.query('SELECT Name,Color, Size, Weight FROM SalesLT.Product');
                    console.log('Task3 query exec success, row cnt : ', result.rowsAffected[0]);
                    res.render('task3.ejs',{responses:result.recordset});
        }catch(err){
                    console.error('Error executing task3 sql query: ',err);
                    res.status(500).send("Internal Server Error");
        }
    }
    else{
        res.status(500).send("Not Connected to DB")
    }
})

app.listen(port, () => {
    console.log('running on port 3000');
})

