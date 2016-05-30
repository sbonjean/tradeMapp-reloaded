"use strict";
/*jslint browser:true */
/*global $, jQuery, include*/
/*jslint node: true */
/*jslint plusplus: true */
/*jslint devel: true */
/*jslint debug: true */
/*jslint asi: true */


var query = require('../connect/connect.js');
var async = require('async');


/**
 * Avoids errors when creating tables
 * @param args.table - Name of the tabe to create
 * @param args.value - Null
 * @param args.action - The action that will create the table
 */

var main = function(donequery, args) {


    async.waterfall([

            // Tries to read from table to create
            // Will throw error if the table does not exists

            function(tableReadDone) {

                query(tableReadDone, {
                    action: 'SELECT * FROM ' + '"' + args.table + '"',
                    value: ''
                });

            }
        ],
        function(err, result) {

            if (err) {
                // If there is an error, the table does no exist
                // It is then created
                debugger;
                query(donequery, {
                    action: args.action,
                    value: args.value
                });
            } else {
                // If there is no error, the table exists already and the script ends
                debugger;
                donequery(null, 'dummy');
            }

        });

};

module.exports = main; // Exports pg connection