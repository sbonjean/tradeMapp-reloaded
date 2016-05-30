/*jslint browser:true */
/*global $, jQuery*/
/*jslint node: true */
/*jslint plusplus: true */
/*jslint devel: true */

module.exports = function(app, env) {

    app.get('/', function(req, res) {
        res.sendfile("views/landing/landing.html");
    });

    console.log('sdsd');

};