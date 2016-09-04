var express = require('express');
var app = express();
// var bodyParser = require('body-parser')


//file servings
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

// parse application/json 
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/api/data',function(req, res)
{
   var temp = req.param('temp');
  console.log("Temperature in living room: " + temp );
  console.log(Date.now());
  res.end("Got it");
});

app.post('/', function(req, res)
{
    console.log("some one is sending")
});

app.get('/', function(req, res){
  var name=req.query.name;
  res.render('index.ejs',{user:name, title:"Breing site"})
});


app.listen(3000);
