var express=require('express');
var path=require('path');
var request=require('request');
var cheerio=require('cheerio');
var fs=require('fs');
var app=express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var port=8000;


var urll="http://www.htcampus.com/engineering/colleges-in-andhra-pradesh-state/";


app.get('/', function(req, res){
   
  

MongoClient.connect(url, function(err, db) {
  if (err) 
	  throw err;
  var dbo = db.db("colleges");
  
  dbo.collection("btech_delhi").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
	res.send(result);
    db.close();
  });
  
  
  })   
});
  
app.listen(port);
console.log('server running at'+port);
	
