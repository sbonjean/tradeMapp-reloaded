"use strict";
/*jslint browser:true */
/*global $, jQuery, include*/
/*jslint node: true */
/*jslint plusplus: true */
/*jslint devel: true */
/*jslint debug: true */
/*jslint asi: true */
/*
    Connects and querying the Postgres Database
    Using the module at https://github.com/brianc/node-postgres
*/

var pg = require('pg');


/**
 * Querying the postGreSql database
 * @param args.query.text - Query string in example 'SELECT COUNT(date) AS count FROM visits WHERE date = $1'
 * @param args.query.values - Query values in example [date]
 * @param donequery - Callback function returns the data
 */
var query = function(donequery, args) {

    // Getting the psqlq database config settings
    var conString = (process.env.NODE_ENV === "production" ? require('./configHeroku') : require('./configLocal'));

    //this initializes a connection pool
    //it will keep idle connections open for a (configurable) 30 seconds
    //and set a limit of 10 (also configurable)
    pg.connect(conString, function(err, client, doneconnect) {




        if (err) {
            //call `doneconnect()` to release the client back to the pool
            doneconnect();
            return donequery(err, null);
        }

        client.query(args.action, args.value, function(err, result) {

            //call `doneconnect()` to release the client back to the pool
            doneconnect();

//            console.log('err', err);
 //           console.log('resut', result);

            if (err) {
                // console.error('error querying client from pool', err);
                return donequery(err, null);
            }
            return donequery(null, result);

        });

    });

}; // Exports pg connection

module.exports = query; // Exports pg connection