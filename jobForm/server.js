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
  password: '',
  database: 'hire'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});




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

      
      res.render('form', {state:states,relation:rel,location:location,dep:department,course:courses,language:languages,tec:technologies});
    });
  });

});
});  
});
});
});
});



app.post('/submit', (req, res) => {
  // Retrieve the form data and insert it into the database
 
  const data = req.body;
  const course = req.body.course;
  const board = req.body.board;
  const passingyear = req.body.passingYear;
  const pr = req.body.percentage;
  console.log(course);
  console.log(board);
  console.log(passingyear);
  console.log(pr);

  const c_name = req.body.company_name;
  const desig = req.body.designation;
  const start = req.body.start_date;
  const end = req.body.end_date;
 console.log(c_name);
 console.log(desig);
 console.log(start);
 console.log(end);



  
  const basicSql = `INSERT INTO basic_info (first_name,last_name,gender,dob,job_designation,address1,email,phone,city,state,zip,relation_status)
   VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
   const basicValue = [data.first_name,data.last_name,data.gender,data.dob,
    data.job_designation,data.address1,data.email,data.phone,data.city,data.state,data.zip,
    data.relation_status];
  db.query(basicSql, basicValue, (err, result) => {
    if (err) {
      throw err;
    }
    const applicantId = result.insertId;



    if(typeof(course,board,passingyear,pr) == "string"){
      eduSql = `insert into acadamics(applicant_id,course,board,passingYear,percentage) values
      ('${applicantId}','${course}','${board}','${passingyear}','${pr}')`;

      db.query(eduSql,(err,result)=>{
        if(err) throw err;
        console.log('edu inserted');
      })
    }else{
      for(i=0;i<course.length;i++){
        eduSql = `insert into acadamics(applicant_id,course,board,passingYear,percentage) values
      ('${applicantId}','${course[i]}','${board[i]}','${passingyear[i]}','${pr[i]}')`;

      db.query(eduSql,(err,result)=>{
        if(err) throw err;
        console.log('edu inserted')
      })
      }
    }


    if(typeof(c_name,desig,start,end) == "string"){
      expSql = `insert into work_experience(applicant_id,company_name,jobtitle,start_date,end_date) values
      ('${applicantId}','${c_name}','${desig}','${start}','${end}')`;

      db.query(expSql,(err,result)=>{
        if(err) throw err;
        console.log('exp inserted');
      })
    }else{
      for(i=0;i<c_name.length;i++){
        expSql = `insert into work_experience(applicant_id,company_name,jobtitle,start_date,end_date) values
      ('${applicantId}','${c_name[i]}','${desig[i]}','${start[i]}','${end[i]}')`;

      db.query(expSql,(err,result)=>{
        if(err) throw err;
        console.log('exp inserted');
      })
      }
    }

// Get the languages 
const languages = req.body.Languages;
console.log("languages"+languages);


languages.forEach((language) => {
  const read = req.body.read ? 'yes' : 'no';
  const write = req.body.write ? 'yes' : 'no';
  const speak = req.body.speak ? 'yes' : 'no';

  db.query("INSERT INTO LanguagesKnown(applicant_id,Language,`read`,`write`,`speak`) VALUES (?, ?, ?, ?, ?)", [applicantId ,language, read, write, speak], (err, result) => {
    if (err) {
      throw err;
    }

    console.log('language inserted');
    
  });
});


console.log(data);

const skills = req.body.technology;
console.log('tec :'+skills);
// console.log(req.body[req.body.technology[0]+'a']);
skills.forEach((tec)=>{
  const lavel = req.body[tec+'a'];
  db.query("insert into skills(applicant_id,technology,lavel) values(?,?,?)",[applicantId,tec,lavel],(err,result)=>{
    if(err) throw err;
    console.log('skills inserted')
  })

});


    
    res.send('done')



  });
});


app.listen(8000);