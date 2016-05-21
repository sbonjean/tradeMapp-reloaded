"use strict";
/*jslint browser:true */
/*global $, jQuery, include*/
/*jslint node: true */
/*jslint plusplus: true */
/*jslint devel: true */
/*jslint debug: true */
/*jslint asi: true */


var query = require('../db/pg/connect/connect.js');
var createTable = require('../db/pg/query/createTable.js');
var errorHandling = require('./x.errorHandling.js');

var uuid = require('node-uuid');
var async = require('async');
var chalk = require('chalk');


var insertInPg = function(collection, doc, insertInPgCallback) {

    var id = uuid.v4();
    var insertAction, createAction, data;

    switch (collection) {
        case "user":
            createAction = 'CREATE TABLE "user" ("id" SERIAL PRIMARY KEY, "login" varchar(100), "password" varchar(100), "group" VARCHAR(10), "lan" VARCHAR(3), "lastName" VARCHAR(100), "firstName" VARCHAR(100), "mobUserName" VARCHAR(30), "subscriptionId" VARCHAR(30), "company" VARCHAR(50))';
            insertAction = 'INSERT INTO "user" ("login","password","group","lan","lastName","firstName","mobUserName","subscriptionId","company") VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)';
            data = [doc.login, doc.password, doc.group, doc.lan, doc.lastName, doc.firstName, doc.mobUserName, doc.subscriptionId, doc.company];
            break;

        case "userGroup":
            createAction = 'CREATE TABLE "userGroup" ("id" SERIAL PRIMARY KEY, "name" VARCHAR(100), "design" BOOLEAN, "map" BOOLEAN, "exportExcel" BOOLEAN, "admin" BOOLEAN, "usersAdmin" BOOLEAN, "dashboard" BOOLEAN, "reports" BOOLEAN)';
            insertAction = 'INSERT INTO "userGroup" ("name","design","map","exportExcel","admin","usersAdmin","dashboard","reports") values($1,$2,$3,$4,$5,$6,$7,$8)';
            data = [doc.name, doc.design, doc.map, doc.exportExcel, doc.admin, doc.usersAdmin, doc.dashboard, doc.reports];
            break;

        case "subscription":
            createAction = 'CREATE TABLE "subscription" ("id" SERIAL PRIMARY KEY, "country" VARCHAR(30), "company" VARCHAR(100), "subCode" VARCHAR(30), "state" VARCHAR(30), "numberOfTransactions" INTEGER, "gpsLat" REAL, "gpsLong" REAL, "startDate" DATE, "endDate" DATE)';
            insertAction = 'INSERT INTO "subscription" ("country","company","subCode","state","numberOfTransactions","gpsLat","gpsLong","startDate", "endDate") values($1,$2,$3,$4,$5,$6,$7,$8,$9)';
            data = [doc.country, doc.company, doc.subCode, doc.state, doc.numberOfTransactions, doc.gpsLat, doc.gpsLong, doc.startDate, doc.endDate];
            break;

        case "dashboard":
            createAction = 'CREATE TABLE "dashboard" ("id" SERIAL PRIMARY KEY, "subs" VARCHAR(30), "countRecord" INTEGER, "countSurvey" INTEGER, "activeCampaigns" JSON[], "metrics" JSON[], "percentageOfPlanUsed" INTEGER)';
            insertAction = 'INSERT INTO "dashboard" ("subs","countRecord","countSurvey","metrics","percentageOfPlanUsed") values($1,$2,$3,$4,$5)';
            data = [doc.subs, doc.countRecord, doc.countSurvey, doc.metrics, doc.percentageOfPlanUsed];
            break;

        case "layout":
            createAction = 'CREATE TABLE "layout" ("id" SERIAL PRIMARY KEY, "lan" VARCHAR(10), "page" VARCHAR(15), "elements" JSON)';
            insertAction = 'INSERT INTO "layout" ("lan","page","elements") values($1,$2,$3)';
            data = [doc.lan, doc.page, doc.elements];
            break;

        default:
            break;
    }


    async.waterfall([

            function(createTableDone) {

                createTable(createTableDone, {
                    table: collection,
                    action: createAction,
                    value: ''
                })

            },
            function(dummy, insertInTableDone) {

                query(insertInTableDone, {
                    action: insertAction,
                    value: data
                });
            }
        ],
        function(err, result) {
            insertInPgCallback();
        });

};

module.exports = insertInPg; // Exports pg connection