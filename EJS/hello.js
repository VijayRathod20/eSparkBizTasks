var express = require('express');
var app = express();

//set ejs as template ingine;
app.set('view engine','ejs');

var VariableString = "This is Variable";

// use res.render to load up an ejs view file
app.get('/',(req,res)=>{
   res.render('home',{variable:VariableString});
});

app.listen(8080);
console.log('Server is listening on port 8080');
