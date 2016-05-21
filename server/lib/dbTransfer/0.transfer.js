"use strict";
/*jslint browser:true */
/*global $, jQuery, include*/
/*jslint node: true */
/*jslint plusplus: true */
/*jslint debug: true */
/*jslint asi: true */



var async = require('async');
var errorHandling = require('./x.errorHandling.js');
var transferCollection = require('./1.transferCollection');

/**
 * Looping through collections to transfer from mongo to postgres
 */

var transfer = function() {



    // Collections to transfer
    var collections = ['user', 'userGroup', 'subscription', 'layout', 'dashboard'];



    async.eachSeries(collections, function(collection, eachCollectionCallback) {

        transferCollection(collection, eachCollectionCallback);

    }, function(err) {
        errorHandling(err, '', '', 'processing collections');
    });
};


module.exports = transfer;