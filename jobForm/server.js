const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Set up the middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set up the database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'job_application'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});



// Set up the route for the job application form
app.get('/', (req, res) => {
  
  db.query('SELECT option_name FROM option_master where select_id = 1', (err, states) => {
    if (err) {
      throw err;
    }

    db.query('SELECT option_name FROM option_master where select_id = 2', (err, rel) => {
      if (err) {
        throw err;
      }
      db.query('SELECT option_name FROM option_master where select_id = 3', (err, location) => {
        if (err) {
          throw err;
        }

        db.query('SELECT option_name FROM option_master where select_id = 4', (err, department) => {
          if (err) {
            throw err;
          }
          db.query('SELECT option_name FROM option_master where select_id = 5', (err, courses) => {
            if (err) {
              throw err;
            }
            db.query('SELECT option_name FROM option_master where select_id = 6', (err, languages) => {
              if (err) {
                throw err;
              }
              db.query('SELECT option_name FROM option_master where select_id = 7', (err, technologies) => {
                if (err) {
                  throw err;
                }

      // Render the job application form and pass the data for the select boxes to the template
      res.render('form', {state:states,relation:rel,location:location,dep:department,course:courses,language:languages,tec:technologies});
    });
  });

});

});  
});
});
});
});
  app.listen(8000);