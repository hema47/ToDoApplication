var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//connect to the database
mongoose.connect('mongodb://****:****@ds127428.mlab.com:27428/toappdo')	;

//create a schema that is like a blueprint for db
var todoSchema = new mongoose.Schema({
	item : String
});
//create model
var Todo = mongoose.model('Todo',todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended:false});// middleware

module.exports = function(app){

app.get('/todo',function(req,res){
//get data from mongodb and add it to the view
Todo.find({},function(err,data){
	if(err) throw err;
   res.render('todo',{todos : data});
  });
}) ;

app.post('/todo',urlencodedParser, function(req,res){
//get data from view and add it to database
var newTodo = Todo(req.body).save(function(err,data){
	if(err) throw err;
	res.json(data);
   });
}) ;

app.delete('/todo/:item',function(req,res){
//delete the requested data from the mongodb
Todo.find({item : req.params.item.replace(/\-/g," ")}).remove(function(err,data){
	if(err) throw err;
	res.json(data);
  });
}) ;
};
