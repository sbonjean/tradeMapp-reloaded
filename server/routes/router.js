module.exports = function(app) {

    // Requiring routes

    var login = require('./login.js')(app);
    // var landing = require('./landing.js')(app, envVar);

    // var test = require('./test.js')(app);

    // var login = require('./login')(app, envVar, query);

};