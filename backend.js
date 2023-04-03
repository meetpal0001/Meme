const { Client } = require('pg');

var express = require("express");
var app = express();
var path = require("path");
const exphbs = require('express-handlebars');

app.engine('.hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');


var HTTP_PORT = process.env.PORT || 8080;


function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}




// database connection
const client = new Client({
  user: 'easpgdaf',
  host: 'trumpet.db.elephantsql.com',
  database: 'easpgdaf',
  password: 'q0g2NxyLQBIAWvzhnTCNKzv2B8RPtLlc',
  port: 5432,
});
client.connect();



client.query('SELECT * FROM students', (err, res) => {
  if (err) throw err;
  console.log(res.rows);
  someData = res.rows;
  client.end();
});


app.get("/viewData", function (req, res) {



  res.render('viewData', {
    data: someData,
    layout: false // do not use the default Layout (main.hbs)
  });

});



// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);
