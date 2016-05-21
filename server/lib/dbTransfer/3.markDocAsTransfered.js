"use strict";
/*jslint browser:true */
/*global $, jQuery, include*/
/*jslint node: true */
/*jslint plusplus: true */
/*jslint devel: true */

var mongoCrud = require('../db/mongo/crud/crud.js');

var markAsTransfered = function(collection, docId, callback) {

    var surveyPromiseQuery = mongoCrud.update.one({
        collection: collection,
        match: {
            "_id": docId
        },
        update: {
            transfered: "true"
        }
    });
    surveyPromiseQuery.addBack(function(err, question) {

        debugger;
        console.log(collection, "document id :", docId, 'has been processed');
        callback();
    });
};


module.exports = markAsTransfered; // Exports pg connection