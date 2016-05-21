/* 
------------------------------
Building express application
------------------------------
*/

var express = require('express');
var app = express();
var path = require('path');
var chalk = require('chalk');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'jade');
app.set("jsonp callback", true);
app.use(express.static(path.join(__dirname, '/client/public')));

var routes = require('./server/routes/router.js')(app);

module.exports = app;