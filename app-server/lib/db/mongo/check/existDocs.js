"use strict";
/*jslint browser:true */
/*global $, jQuery, include*/
/*jslint node: true */
/*jslint plusplus: true */
/*jslint devel: true */

var chalk = require('chalk');
var _ = require('lodash');

var existDocs = function(err, docs, collection, existDocsCallback) {

    if (err) {
        console.log(chalk.red.underline('Error when getting' + collection + 's from server'));
        return false;
    }
    if (!docs) {
        console.log(chalk.green('No new records to process in ' + collection));
        return false;
    }
    if (_.isEmpty(docs)) {
        console.log(chalk.green('No new records to process in ' + collection));
        return false;
    }

    // returns true if no issues docs
    return true;

};

module.exports = existDocs; // Exports pg connection