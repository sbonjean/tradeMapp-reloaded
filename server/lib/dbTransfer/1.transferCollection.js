"use strict";
/*jslint browser:true */
/*global $, jQuery, include*/
/*jslint node: true */
/*jslint plusplus: true */
/*jslint devel: true */
/*jslint debug: true */
/*jslint asi: true */
/*
    Reads data from mongoDb database and put them into pg database
*/

var existDocs = require('../db/mongo/check/existDocs.js');
var markDocAsTransfered = require('./3.markDocAsTransfered.js');
var insertInPg = require('./2.insertInPg.js');
var mongoCrud = require('../db/mongo/crud/crud.js');


var chalk = require('chalk');
var async = require('async');
var filename = require('filename');


/**
 * Querying the postGreSql database
 * @param args.config - Heroku pg configuration details
 */
var transfer = function(collection, eachCollectionCallback) {

    // debugger;

    var userPromiseQuery = mongoCrud.find.multiple({
        collection: collection,
        match: {
            transfered: {
                $ne: "true"
            }
        },
        limit: 200
    });

    userPromiseQuery.addBack(function(err, docs) {

        // ends the script of no docs returned
        if (!existDocs(err, docs, collection)) {
            eachCollectionCallback();
            return;
        }

        console.log(docs);

        async.eachSeries(docs, function(doc, eachDocumentCallback) {
                console.log(doc);
                async.waterfall([



                        function(writeDataCallback) {
                            insertInPg(collection, doc, writeDataCallback);
                        },
                        function(markAsSentcallback) {
                            // markDocAsTransfered(collection, doc.id, markAsSentcallback);
                            markAsSentcallback(null, null);
                        }
                    ],
                    function(err) {
                        if (err) {
                            console.log(chalk.red.underline('Error in processing ', doc.id, 'of', collection));
                            console.log(chalk.red.underline('This has stopped the process '));
                        }
                        eachDocumentCallback();
                    });





            },
            function(err) {
                if (err) {
                    console.log(chalk.red.underline('Error in processing ', collection));
                    console.log(chalk.red.underline('This has stopped the process '));
                } else {
                    console.log(chalk.green(collection, 'processed fine '));
                }
                eachCollectionCallback();
            });
    });
};






module.exports = transfer; // Exports pg connection