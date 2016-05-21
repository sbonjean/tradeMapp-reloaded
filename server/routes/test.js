"use strict";
/*jslint browser:true */
/*global $, jQuery, include*/
/*jslint node: true */
/*jslint plusplus: true */
/*jslint devel: true */
/*jslint debug: true */
/*jslint asi: true */

var query = require("../lib/db/pg/connect/connect.js");

module.exports = function(app) {




    app.get('/test', function(req, res) {

        console.log(process.env.NODE_ENV);

        var transferUser = require('../lib/dbTransfer/0.transfer.js')();

        //     res.sendfile("views/landing/landing.html");




    });



    // var rows = [{
    //     name: 'Brian',
    //     age: 31
    // }, {
    //     name: 'Aaron',
    //     age: 29
    // }]

    // var buildStatement = function(rows) {
    //     console.log(rows)
    //     var params = []
    //     var chunks = []
    //     var valueClause = []
    //     for (var i = 0; i < rows.length; i++) {
    //         var row = rows[i]
    //         console.log(row.name)
    //         var valuesClause = []
    //         params.push(row.name)
    //         valueClause.push('$' + params.length)
    //         params.push(row.age)
    //         valueClause.push('$' + params.length)
    //         chunks.push('(' + valueClause.join(', ') + ')')
    //     }
    //     console.log(params)
    //     return {
    //         text: 'INSERT INTO foo(name, age) VALUES ' + chunks.join(', '),
    //         values: params
    //     }
    // }


    // var querySettings = {
    //     action: 'CREATE TABLE "posts" ("content" varchar(100), "user_id" varchar(100))',
    //     value: ''
    // };
    // var shouldType = 'exist';



    // console.log(buildStatement(rows));



    // Requiring routes

    // var login = require('./login.test.js')(app, envVar);
    // var landing = require('./landing.js')(app, envVar);

    // var test = require('../lib/db/pg/crud/insert.js')(app);
    //var test = require('../lib/db/mongo/crud/crud.js')(app);



    // var login = require('./login')(app, envVar, query);

};