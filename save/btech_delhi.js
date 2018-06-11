var express=require('express');
var path=require('path');
var request=require('request');
var cheerio=require('cheerio');
var fs=require('fs');
var app=express();
var port=8000;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var urll="http://www.htcampus.com/engineering/colleges-in-delhi-state/";


app.get('/', function(req, res){
   
   request(urll,function(err,resp,body){
	var $=cheerio.load(body);
	var compname=$('.college-list.pull-right');
	var comptext=compname.text();
	
    res.send(comptext);
	
	
	
	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("colleges");
  var myobj = { name: comptext};
  dbo.collection("btech_delhi").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
	
	
	
	
})   
});
app.listen(port);
console.log('server running at'+port);
	
