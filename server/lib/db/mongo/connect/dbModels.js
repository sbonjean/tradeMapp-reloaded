"use strict";
/*jslint browser:true */
/*global $, jQuery, include*/
/*jslint node: true */
/*jslint plusplus: true */
/*jslint devel: true */

/*
    Connects and querying the MongoDb Database
    Using the mongoose library
*/

/**
 * Querying the postGreSql database
 * @param args.config - Heroku pg configuration details
 */
var dbModels = (function(callback, args) {

    var db;

    // switch (args.env) {
    //     case "development":
    //         db = require('./db_Dev.js');
    //         break;
    //     case "local":
    //         db = require('./db_Local.js');
    //         break;
    //     default:
    //         db = require('./db_Prod.js');
    //         break;
    // }

    db = require('./db_Prod.js');


    // DB connection and Models constructors
    return new require('./schemas.js')(db);


})(); // Exports pg connection

module.exports = dbModels; // Exports pg connection