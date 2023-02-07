const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'student_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database');
});

const generateRecords = () => {
    let records = [];
    for (let i = 0; i < 1500; i++) {
      records.push([
        `student_${i}`, 
        `student_${i}@email.com`,
        Math.floor(Math.random() * 100),
       
      ]);
    }
    return records;
  };
  
  app.get('/insert', (req, res) => {
    const records = generateRecords();
    const sql = `INSERT INTO student (name, email, score) VALUES ?`;
    connection.query(sql, [records], (err, result) => {
      if (err) throw err;
      console.log(`Inserted ${result.affectedRows} rows`);
      res.send(`Inserted ${result.affectedRows} rows`);
    });
  });
  
  