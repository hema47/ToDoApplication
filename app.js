var express = require('express');

var todoController = require('./controllers/todoController');

var app = express();
//set up template
app.set('view engine','ejs');
//static file
app.use(express.static('./public'));
//fire controller
todoController(app);
//listen to port
app.listen(8000);
console.log('You are litening to port 8000');
