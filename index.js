var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var lastTempArray = new Array();
var lastTemp;
var lastTime = Date.now();


//file servings
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/node-modules',  express.static(__dirname + '/node-modules'));

// parse application/json 
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/api/data',function(req, res)
{
  var timeNow = new Date();
  var temp = req.param('temp');
  var point={time:timeNow, value:temp};
  if(lastTemp==null)
  {
    lastTemp=temp;
  }
  var dif=Math.abs(lastTemp-temp);
  var difTime=Date.now()-lastTime;
  if (dif>0.5||difTime>60000)
  {
    lastTime=Date.now();
    lastTemp=temp;
    if (lastTempArray.length < 1000)
    {
      lastTempArray.push(point);
    }
    else{
      lastTempArray.shift();
      lastTempArray.push(point);
    }
    
    console.log("Temperature in living room: " + temp );
    console.log(Date.now());
    var jsonObject=JSON.stringify(point);
    io.emit('tempUpdate', jsonObject);
    res.end("Got it");
  }
    
  
});

app.get('/*', function(req, res){
  var name=req.query.name;
  res.render('index.ejs',{user:name, title:"Brewing site"})
});

io.on('connection', function(socket){
  console.log('a user connected');
  var jsonObject=JSON.stringify(lastTempArray);
  io.emit('tempHistory', jsonObject);
});

http.listen(3000);
