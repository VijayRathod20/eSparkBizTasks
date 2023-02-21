const express = require("express");
const app = express();
app.set("view engine", "ejs");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
app.listen(8080);

// Set up the middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set up the database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "job_application",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

// Set up the route for the job application form
app.get("/", (req, res) => {
  db.query("SELECT * FROM state_master", (err, states) => {
    if (err) {
      throw err;
    }
  
    db.query(
      "SELECT option_name FROM option_master where select_id = 2",
      (err, rel) => {
        if (err) {
          throw err;
        }
        db.query(
          "SELECT option_name FROM option_master where select_id = 3",
          (err, location) => {
            if (err) {
              throw err;
            }

            db.query(
              "SELECT option_name FROM option_master where select_id = 4",
              (err, department) => {
                if (err) {
                  throw err;
                }
                db.query(
                  "SELECT option_name FROM option_master where select_id = 5",
                  (err, courses) => {
                    if (err) {
                      throw err;
                    }
                    db.query(
                      "SELECT option_name FROM option_master where select_id = 6",
                      (err, languages) => {
                        if (err) {
                          throw err;
                        }
                        db.query(
                          "SELECT option_name FROM option_master where select_id = 7",
                          (err, technologies) => {
                            if (err) {
                              throw err;
                            }

                            // Render the job application form and pass the data for the select boxes to the template
                            res.render("job_form", {
                              states: states,
                              relation: rel,
                              location: location,
                              dep: department,
                              course: courses,
                              language: languages,
                              tec: technologies,
                            });
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});



app.get('/cities', (req, res) => {
  const stateId = req.query.stateId;
  db.query('SELECT * FROM city_master WHERE state_id = ?', [stateId], (error, cities) => {
    if (error) {
      console.error('Error fetching cities: ', error);
      res.sendStatus(500);
    } else {
      res.json(cities);
    }
  });
});




app.post("/submit", (req, res) => {
 
  const data = req.body;
  const course = req.body.course;
  const board = req.body.board;
  const passingyear = req.body.passingYear;
  const pr = req.body.percentage;
  console.log(course);
  console.log(board);
  console.log(passingyear);
  console.log(pr);
  // let state = data.start;
  // console.log("state"+state)
   const state = req.body.state;
   const city = req.body.city;
   let stateName = '';
   console.log(city);
   db.query(`select * from state_master where id = ${state}`,(err,result)=>{
    console.log(result[0].state);
    stateName = result[0].state;

     const basicSql = `INSERT INTO basic_info (first_name,last_name,gender,dob,job_designation,address1,email,phone,city,state,zip,relation_status)
   VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
  const basicValue = [
    data.first_name,
    data.last_name,
    data.gender,
    data.dob,
    data.job_designation,
    data.address1,
    data.email,
    data.phone,
    data.city,
    stateName,
    data.zip,
    data.relation_status,
  ];
  db.query(basicSql, basicValue, (err, result) => {
    if (err) {
      throw err;
    }

    //
     const applicantId = result.insertId;

    if (typeof (course, board, passingyear, pr) == "string") {
      eduSql = `insert into acadamics(applicant_id,course,board,passingYear,percentage) values
      ('${applicantId}','${course}','${board}','${passingyear}','${pr}')`;

      db.query(eduSql, (err, result) => {
        if (err) throw err;
        console.log("edu inserted");
      });
    } else {
      for (i = 0; i < course.length; i++) {
        eduSql = `insert into acadamics(applicant_id,course,board,passingYear,percentage) values
      ('${applicantId}','${course[i]}','${board[i]}','${passingyear[i]}','${pr[i]}')`;

        db.query(eduSql, (err, result) => {
          if (err) throw err;
          console.log("edu inserted");
        });
      }
    }

    const c_name = req.body.company_name;
    const desig = req.body.jobtitle;
    const start = req.body.start_date;
    const end = req.body.end_date;
    console.log(c_name);
    console.log(desig);
    console.log(start);
    console.log(end);
    if (typeof (c_name, desig, start, end) == "string") {
      expSql = `insert into work_experience(applicant_id,company_name,jobtitle,start_date,end_date) values
      ('${applicantId}','${c_name}','${desig}','${start}','${end}')`;

      db.query(expSql, (err, result) => {
        if (err) throw err;
        console.log("exp inserted");
      });
    } else {
      for (i = 0; i < c_name.length; i++) {
        expSql = `insert into work_experience(applicant_id,company_name,jobtitle,start_date,end_date) values
      ('${applicantId}','${c_name[i]}','${desig[i]}','${start[i]}','${end[i]}')`;

        db.query(expSql, (err, result) => {
          if (err) throw err;
          console.log("exp inserted");
        });
      }
    }


    //languages insert
    var lang = req.body.Language;
    var r = req.body[lang + "read"] ? "yes" : "no";
    var w = req.body[lang + "write"] ? "yes" : "no";
    var s = req.body[lang + "speak"] ? "yes" : "no";
    console.log(lang);
    console.log(r);
    if (typeof lang == "string") {
      var query_lan =
        "INSERT INTO LanguagesKnown(applicant_id,Language,`read`,`write`,`speak`) VALUES (?, ?, ?, ?, ?)";
      db.query(query_lan, [applicantId, lang, r, w, s], (err, ans) => {
        if (err) return console.log(err.message);
        console.log("languages inserted");
      });
    } else {
      lang.forEach((language) => {
        const read2 = req.body[language + "read"] ? "yes" : "no";
        const write2 = req.body[language + "write"] ? "yes" : "no";
        const speak2 = req.body[language + "speak"] ? "yes" : "no";

        db.query(
          "INSERT INTO LanguagesKnown(applicant_id,Language,`read`,`write`,`speak`) VALUES (?, ?, ?, ?, ?)",
          [applicantId, language, read2, write2, speak2],
          (err, result) => {
            if (err) {
              throw err;
            }

            console.log("language inserted");
          }
        );
      });
    }

    //getting technology
    const skills = req.body.technology;
    const lavel = req.body[skills + "a"];
    console.log("skills " + skills);
    if (typeof skills == "string") {
      db.query(
        "insert into skills(applicant_id,technology,lavel) values(?,?,?)",
        [applicantId, skills, lavel],
        (err, result) => {
          if (err) throw err;
          console.log("skills one inserted");
        }
      );
    } else {
      skills.forEach((tec) => {
        const lavel = req.body[tec + "a"];
        console.log("lavel " + lavel);
        db.query(
          "insert into skills(applicant_id,technology,lavel) values(?,?,?)",
          [applicantId, tec, lavel],
          (err, result) => {
            if (err) throw err;
            console.log("skills inserted");
          }
        );
      });
    }

    //getting references
    const rname = data.rname;
    const rcontact = data.rcontact;
    const relation = data.relation;
    console.log(rname);
    console.log(rcontact);
    console.log(relation);
    for (let i = 0; i < rname.length; i++) {
      db.query(
        `insert into reference(applicant_id,rname,rcontact,relation) 
      values('${applicantId}','${rname[i]}','${rcontact[i]}','${relation[i]}')`,
        (err, result) => {
          if (err) throw err;
          console.log("ferences inserted");
        }
      );
    }

    //preferences
    const plocation = data.location;
    const noticeperiod = data.notice;
    const ectc = data.expected_ctc;
    const pdepartment = data.department;
    db.query(
      `insert into preference(applicant_id,location,notice,expected_ctc,department) values
      ('${applicantId}','${plocation}','${noticeperiod}','${ectc}','${pdepartment}')`,
      (err, result) => {
        if (err) throw err;
        console.log("preferences inserted sucusessfully!");
      }
    );

    res.send("done");
  });
});

   });

 
   

app.get("/views", (req, res) => {
  db.query("SELECT * FROM basic_info WHERE is_deleted = 0", (err, result) => {
    if (err) throw err;
    res.render("views", { record: result });
  });
});

app.get("/search", function (req, res) {
  const column = req.query.column;
  const term = req.query.term;
  const sql = `SELECT * FROM basic_info WHERE ${column} LIKE '%${term}%'`;

  db.query(sql, function (err, results) {
    if (err) throw err;

    // Pass the results to your view engine to render the data on the page
    res.render("views", { record: results, term: term });
  });
});

//delete function
// app.post('/deleteSelected', function(req, res) {
//     var selectedRows = req.body.selectedRows;
//     if (!selectedRows || !selectedRows.length) {
//       res.redirect('/views');
//       return;
//     }
  
//     var placeholders = selectedRows.map(function() { return '?' }).join(',');
//     var sql = 'UPDATE basic_info SET is_deleted = 1 WHERE id IN (' + placeholders + ')';
//     db.query(sql, selectedRows, function(error, results) {
//       if (error) throw error;
//       res.redirect('/views');
//     });

//   });
app.get('/deleteData',(req,res)=>{
    var cd_id = req.query.id;
    db.query(`update basic_info set is_deleted = 1 where id in (${cd_id})`,(err,result)=>{
        if(err) throw err;

    });
})
  
app.post('/deleteOne',(req,res)=>{
    var id = req.query.id;
    db.query(`update basic_info set is_deleted = 1 where id = ${id}`,(err,result)=>{
        if(err) throw err;

    });
    res.json({ans: "deleted successfully!"})
});

app.get('/retrive',(req,res)=>{
  db.query("update basic_info set is_deleted = 0",(err,result)=>{
    if(err) throw err;
    res.send('retrive succesfull');
  })
})