var express=require('express');
var path=require('path');
var request=require('request');
var cheerio=require('cheerio');
var fs=require('fs');
var app=express();
var exphbs=require('express-handlebars');

var path=require('path');
var request=require('request');
var cheerio=require('cheerio');
var fs=require('fs');
const bodyParser = require("body-parser");
var port=8000;
var html_dir = './html/';
 var redirect = require("express-redirect");
 redirect(app);
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//var urll="http://www.htcampus.com/engineering/colleges-in-india/?page=2";
var btech_delhi="http://www.htcampus.com/engineering/colleges-in-delhi-state/";
var btech_andhra="http://www.htcampus.com/engineering/colleges-in-andhra-pradesh-state/";
var btech_karnataka="http://www.htcampus.com/engineering/colleges-in-karnataka-state/";
var btech_kerala="http://www.htcampus.com/engineering/colleges-in-kerala-state/";
var design_assam="http://www.htcampus.com/design/courses-in-assam-state/";
var design_delhi="http://www.htcampus.com/design/courses-in-delhi-state/";
var design_gujrat="http://www.htcampus.com/design/courses-in-gujarat-state/";
var hospitality_andhra="http://www.htcampus.com/hospitality-management/courses-in-andhra-pradesh-state/";
var hospitality_delhi="http://www.htcampus.com/hospitality-management/courses-in-delhi-state/";
var hospitality_karnataka="http://www.htcampus.com/hospitality-management/courses-in-karnataka-state/";
var mba_andhra="http://www.htcampus.com/mba/colleges-in-andhra-pradesh-state/";
var mba_assam="http://www.htcampus.com/mba/colleges-in-assam-state/";
var mba_delhi="http://www.htcampus.com/mba/colleges-in-delhi-state/";
var mba_karnataka="http://www.htcampus.com/mba/colleges-in-karnataka-state/";




app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json());





app.get("/rand_ques",function(req,res)
{

var city=req.query.city_name;
var stream=req.query.stream;

var que_num=Math.floor(Math.random() * 10) + 1;

console.log(que_num);

if(que_num==1||3||5||7)
{
	res.redirect("/quiz");
}

if(que_num==2||4||6||8||9||10)
{
	res.redirect("/quiz1");
}
/*var y=2;

MongoClient.connect(url, function(err, db) {
  if (err) 
	  throw err;
  var dbo = db.db("colleges");
  
  dbo.collection("questions").find({'quesno':y}).toArray(function(e,docs){
  

var yr=JSON.stringify(docs);

res.render('rand_ques',{'ques':yr});







  });


})

*/



	});










app.get("/loc_based_search",function(req,res)
{

var city=req.query.city_name;
var stream=req.query.stream;




MongoClient.connect(url, function(err, db) {
  if (err) 
	  throw err;
  var dbo = db.db("colleges");
  
  dbo.collection("noida_mba").find({}).toArray(function(e, docs) {
  
  //var myobj=JSON.parse(docs);
  //var nme=docs[0];
var yr=JSON.stringify(docs);

res.render('loc_clg_search',{'data':yr});







  });


})





	});



app.get("/result_quiz", function (req, res) {
    
    var option1=req.query.ans1;
    var option2=req.query.ans2;
    var option3=req.query.ans3;
    var option4=req.query.ans4;
    var option5=req.query.ans5;
    var option6=req.query.ans6;
    var option7=req.query.ans7;
    var option8=req.query.ans8;
    var option9=req.query.ans9;
    var type1=0;
    var type2=0;
    var type3=0;


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("colleges");
  dbo.collection("quiz").findOne({}, function(err, result) {
    if (err) throw err;
    

  if(option1==result.answer1)
  {
  	type1++;
  }
  if(option2==result.answer2)
  {
  	type1++;
  }
if(option3==result.answer3)
  {
  	type1++;
  }
if(option4==result.answer4)
  {
  	type2++;
  }
  if(option5==result.answer5)
  {
  	type2++;
  }
  if(option6==result.answer6)
  {
  	type2++;
  }
  if(option7==result.answer7)
  {
  	type3++;
  }
  if(option8==result.answer8)
  {
  	type3++;
  }
  if(option9==result.answer9)
  {
  	type3++;
  }
var course;

if(type1>type2&&type1>type3)
{
	course="B.TECH";
}

if(type2>type1&&type2>type3)
{
	course="M.B.A";
}

if(type3>type2&&type3>type1)
{
	course="CIVIL SERVICES";
}


if(type1==type2&&type1!=type3)
{
	course="B.TECH or M.B.A";
}
if(type1==type3&&type1!=type2)
{
	course="B.TECH or CIVIL SERVICES";
}

if(type1!=type2&&type2==type3)
{
	course="M.B.A or CIVIL SERVICES";
}

res.render('result',{'res1':type1,'res2':type2,'res3':type3,'course_res':course});

    db.close();
  });
});




	
});


app.get("/result_quiz1", function (req, res) {
    

    var option1=req.query.ans1;
    var option2=req.query.ans2;
    var option3=req.query.ans3;
    var option4=req.query.ans4;
    var option5=req.query.ans5;
    var option6=req.query.ans6;
    var option7=req.query.ans7;
    var option8=req.query.ans8;
    var option9=req.query.ans9;
    var type1=0;
    var type2=0;
    var type3=0;


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("colleges");
  dbo.collection("quiz1").findOne({}, function(err, result) {
    if (err) throw err;
    

  if(option1==result.answer1)
  {
  	type1++;
  }
  if(option2==result.answer2)
  {
  	type1++;
  }
if(option3==result.answer3)
  {
  	type1++;
  }
if(option4==result.answer4)
  {
  	type2++;
  }
  if(option5==result.answer5)
  {
  	type2++;
  }
  if(option6==result.answer6)
  {
  	type2++;
  }
  if(option7==result.answer7)
  {
  	type3++;
  }
  if(option8==result.answer8)
  {
  	type3++;
  }
  if(option9==result.answer9)
  {
  	type3++;
  }


 console.log(count);
res.render('result',{'res1':type1,'res2':type2,'res3':type3});

    db.close();
  });
});




    
	
});



app.get("/result_quiz2", function (req, res) {
    


var option1=req.query.ans1;
    var option2=req.query.ans2;
    var option3=req.query.ans3;
    var option4=req.query.ans4;
    var option5=req.query.ans5;
    var option6=req.query.ans6;
    var option7=req.query.ans7;
    var option8=req.query.ans8;
    var option9=req.query.ans9;
    var type1=0;
    var type2=0;
    var type3=0;


MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("colleges");
  dbo.collection("quiz2").findOne({}, function(err, result) {
    if (err) throw err;
    

  if(option1==result.answer1)
  {
  	type1++;
  }
  if(option2==result.answer2)
  {
  	type1++;
  }
if(option3==result.answer3)
  {
  	type1++;
  }
if(option4==result.answer4)
  {
  	type2++;
  }
  if(option5==result.answer5)
  {
  	type2++;
  }
  if(option6==result.answer6)
  {
  	type2++;
  }
  if(option7==result.answer7)
  {
  	type3++;
  }
  if(option8==result.answer8)
  {
  	type3++;
  }
  if(option9==result.answer9)
  {
  	type3++;
  }



res.render('result',{'res1':type1,'res2':type2,'res3':type3});

    db.close();
  });
});


   
	
});


app.get("/btech_andhra", function (req, res) {
    
	request(btech_andhra,function(err,resp,body){
	var $=cheerio.load(body);
	var compname=$('.college-list.pull-right').html();
	
    res.send(compname);
	
})   
	
	
});



app.get("/btech_karnataka", function (req, res) {
    request(btech_karnataka,function(err,resp,body){
	var $=cheerio.load(body);
	var compname=$('.college-list.pull-right').html();
	
    res.send(compname);
	
})   
	
});


app.get("/btech_kerala", function (req, res) {
    request(btech_kerala,function(err,resp,body){
	var $=cheerio.load(body);
	var compname=$('.college-list.pull-right').html();
	
    res.send(compname);
	
})   
	
});



app.get("/btech_delhi", function (req, res) {
    
	

	request(btech_delhi,function(err,resp,body){
	var $=cheerio.load(body);
	var compname=$('.college-list.pull-right').html();
	
    res.send(compname);
	
})   
	
	
	
	
	
});


app.get("/design_assam", function (req, res) {
    
	
	 request(design_assam,function(err,resp,body){
	var $=cheerio.load(body);
	var compname=$('.college-list.pull-right').html();
	
    res.send(compname);
	
})   
	
});




app.get("/design_delhi", function (req, res) {
    
	request(design_delhi,function(err,resp,body){
	var $=cheerio.load(body);
	var compname=$('.college-list.pull-right').html();
	
    res.send(compname);
	
})   
	
	
});




app.get("/design_gujrat", function (req, res) {
    
	
	
	 request(design_gujrat,function(err,resp,body){
	var $=cheerio.load(body);
	var compname=$('.college-list.pull-right').html();
	
    res.send(compname);
	
})   
	
});





app.get("/hospitality_andhra", function (req, res) {
    
	
	request(hospitality_andhra,function(err,resp,body){
	var $=cheerio.load(body);
	var compname=$('.college-list.pull-right').html();
	
    res.send(compname);
	
})
	
});



app.get("/hospitality_delhi", function (req, res) {
    
	
	request(hospitality_delhi,function(err,resp,body){
	var $=cheerio.load(body);
	var compname=$('.college-list.pull-right').html();
	
    res.send(compname);
	
}) 
	
});


app.get("/hospitality_karnataka", function (req, res) {
    
	request(hospitality_karnataka,function(err,resp,body){
	var $=cheerio.load(body);
	var compname=$('.college-list.pull-right').html();
	
    res.send(compname);
	
}) 
	
	
});






app.get("/mba_andhra", function (req, res) {
    request(mba_andhra,function(err,resp,body){
	var $=cheerio.load(body);
	var compname=$('.college-list.pull-right').html();
	
    res.send(compname);
	
})
	
});



app.get("/mba_assam", function (req, res) {
    
	
	request(mba_assam,function(err,resp,body){
	var $=cheerio.load(body);
	var compname=$('.college-list.pull-right').html();
	
    res.send(compname);
	
})  
	
});


app.get("/mba_delhi", function (req, res) {
    
	
	request(mba_delhi,function(err,resp,body){
	var $=cheerio.load(body);
	var compname=$('.college-list.pull-right').html();
	
    res.send(compname);
	
})   
	
	
});


app.get("/mba_karnataka", function (req, res) {
    
	
	request(mba_karnataka,function(err,resp,body){
	var $=cheerio.load(body);
	var compname=$('.college-list.pull-right').html();
	
    res.send(compname);
	
})  
	
});


app.get("/quiz", function(req, res) {
    res.sendfile(html_dir + 'quiz.html');

function myFunc(arg) {
  console.log(`arg was => ${arg}`);
  //window.location = "/quiz1";
 
 //window.location.assign("http://localhost:8000/quiz1")
  //res.redirect('/quiz1');
}

setTimeout(myFunc, 5000, 'funky');




});

app.get("/quiz1", function(req, res) {
    res.sendfile(html_dir + 'quiz1.html');
});

app.get("/quiz2", function(req, res) {
    res.sendfile(html_dir + 'quiz2.html');
});

app.get('/', function(req, res) {
    res.sendfile(html_dir + 'index4.html');
});
app.listen(port);
console.log('server running at'+port);
	
