/* 
------------------------------
Building express application
------------------------------
*/

var express = require('express');
var app = express();
//var path = require('path');
//var chalk = require('chalk');
//var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');


app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, './views'));
//app.set('view engine', 'jade');
//app.set("jsonp callback", true);
app.use(express.static('./app-client/public'));
app.use(express.static('./node_modules/bootstrap/dist'));
//app.use(cookieParser());
//app.use(bodyParser.urlencoded({
  //  extended: true
//}));
//app.use(bodyParser.json());

//var routes = require('./server/routes/router.js')(app);

//app.listen(3000);

module.exports = app;