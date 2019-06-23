const express = require('express');
const fs = require('fs');
const app = express();
const exphbs = require('express-handlebars');
const parse = require('csv-parse');
const promise = require('bluebird');


//Setup Handlebars:
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use('/', express.static('./public'));

//Render Home Page:
app.get('/', function(req,res){
  res.render('home');
});

//Read contents of data file:
fs.readFile('frontend_puzzle_data.json','utf8',(err, data) => {
  if (!err) {
      contents = JSON.parse(data);
      console.log(contents);
  }
  else {
      console.error(err);
      throw err;
  }
});

//Algorithm for creating chart data sets:


//API for reading data to page:

app.listen(4250, function () {
  console.log('Example app listening on port 3050.');
});
