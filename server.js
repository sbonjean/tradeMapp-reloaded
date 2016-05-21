/*
 ------------------------------
 Building express application
 ------------------------------
 */

var http = require('http'), // To use the HTTP server and client
    app = require('./app'); // Load up app.js and store it in app object

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
//Returns a new web server object with app as the request listener
});