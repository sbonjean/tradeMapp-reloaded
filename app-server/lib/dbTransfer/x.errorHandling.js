"use strict";
/*jslint browser:true */
/*global $, jQuery, include*/
/*jslint node: true */
/*jslint plusplus: true */
/*jslint devel: true */

var async = require('async');
var chalk = require('chalk');
/**
 * Looping through collections to transfer from mongo to postgres
 */

var main = function(err, doc, collection, process) {

    // if any of the file processing produced an error, err would equal that error
    if (err) {
        // One of the iterations produced an error.
        // All processing will now stop.
        console.log(chalk.red.underline('Error in processing', process, 'this has stopped the process'));
    } else {
        console.log(chalk.bgGreen('all transfers done successfully'));
        // If no errors.
    }
    console.log('');
};

module.exports = main;