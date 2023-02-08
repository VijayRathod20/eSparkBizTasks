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


var first_name = ['vijay', 'pooja', 'kartik', 'manthan', 'milan', 'jaini',
  'isha', 'harmil', 'bharti', 'harsh', 'khushi', 'om', 'path', 'thushar', 'rajesh',
  'jay', 'ajay', 'jaydip', 'vaishvi', 'vrusha', 'dixita', 'pranav', 'akshay', 'priya', 'tulsi',
  'drashti', 'prachi', 'mayuri', 'anushka', 'dipika', 'janvi', 'salman', 'hritik', 'tiger', 'sidharth',
  'varun', 'abhishekh', 'ranbir', 'jack', 'ronaldo', 'messi', 'neymar', 'virat', 'angela', 'elizabeth',
  'alexgender', 'william', 'dominic', 'thore', 'natasha', 'jessica', 'strange', 'pitter'];

var last_name = ['rathod', 'modi', 'dave', 'vadher', 'patel', 'deep', 'sharma', 'kapoor'
  , 'parker', 'torento', 'kohli', 'singh', 'parekh', 'sangvi', 'rupani', 'modi', 'malhotra',
  'naydu', 'datt', 'gada', 'sodhi', ' Smith', 'Johnson', 'Williams', ' Brown', 'Jones',
  'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', ' Anderson',
  'Thomas', 'Martin', 'Lewis', 'Walker', ' King', 'Torres', 'Flores', 'Carter', 'developer', 'engineer'];



app.get('/insert', (req, res) => {

  for (let i = 0; i < 10; i++) {
    random_fname = Math.floor(Math.random() * first_name.length);
    random_lname = Math.floor(Math.random() * last_name.length);
    let email = first_name[random_fname] + last_name[random_lname] + "@gmail.com";
    const start = new Date(1970, 0, 1);
    const end = new Date();
    const randomTimestamp = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTimestamp);
    var date =  randomDate.toISOString().split('T')[0];

    const query = `insert into student_express(first_name,last_name,email,dob) 
    values('${first_name[random_fname]}','${last_name[random_lname]}','${email}','${date}')`;
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.log('row added susscess');
      

    });
   

  }
  res.send("Data Inserted Success!");

});

