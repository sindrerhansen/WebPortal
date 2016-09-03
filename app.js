var express = require('express');
var app = express();
app.get('/', function(req, res){
  var name=req.query.name;
  res.render('index.ejs',{user:name, title:"Hei"})
});
app.post('/data',function(req, res)
{
  console.log("post Data");
})

app.listen(3000);
