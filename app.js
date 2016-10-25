var express=require('express');
var MongoClient=require('mongodb').MongoClient;
var qs=require('querystring');
var app=express();
var assert=require('assert');
var body='';
app.use(express.static('public'));
app.all('/',function(req,res){
	res.sendFile('index.html');
	res.end("done");
});
app.all('/insert',function(req,res){
	req.on('data',function(chunk){
		body+=chunk;
	});
	req.on('end',function()
	{
		var data=qs.parse(body);
		MongoClient.connect('mongodb://localhost:27017/db1',function(err,db){
			assert.equal(null,err);
			console.log("Connected to database");
			ìnsertData(db,data.name,function(){
				db.close();
			})
		});
	});
});
app.listen(2000,function(){
	console.log('server started successfuly.');
})


var insertData=function(db,name,callback){
	db.collection('items').insertOne({"item": name},function(err,result){
		assert.equal(err);
		callback();
	});
};