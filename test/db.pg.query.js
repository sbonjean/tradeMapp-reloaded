var should = require('should');
var assert = require('assert');
var async = require('async');

// Test settings
var query = require("../server/lib/db/pg/connect/connect.js");


// var setDefaultQuerySettings = function(done) {
//     return {
//         callback: done,
//         text: 'SELECT COUNT(date) AS count FROM visits',
//         value: "",
//         config: {
//             user: "vsxtaehejsqasxb",
//             password: "68_G8UqFOCAk3FuWkVimF6DqJ1",
//             database: "d2rvr0rn7ne19b",
//             port: 5432,
//             host: "ec2-107-20-177-12.compute-1.amazonaws.com",
//             ssl: true
//         }
//     };
// };




describe('pg connection', function() {


    // it('should throw an error with incorrect configuration details', function() {
    //     assert.throws(function() {
    //         query({
    //             config: {}
    //         });
    //     }); // Empty config
    //     assert.throws(function() {
    //         query({
    //             config: {
    //                 'user': 'incomplete object'
    //             }
    //         });
    //     }); // Incomplete config
    // });


    // it('should not connect with incorrect configuration details', function(done) {

    //     var querySettings = setDefaultQuerySettings(done);
    //     querySettings.config.user = "incorrect User";
    //     querySettings.cbConnectError = function(err) {
    //         should.exist(err);
    //     };
    //     query(querySettings);

    // });









    // setDefaultQuerySettings(done);
    // querySettings.config = undefined;
    // querySettings.cbQuery = function(err, result) {
    //     should.exist(result);
    // };


    var asyncQueryShould = function(done, querySettings, shouldType) {

        async.waterfall([

                function(queryDone) {
                    // returns data : err, data
                    // err will jump to the last function
                    // data will continue to next function
                    query(queryDone, querySettings);
                },
                function(data, processDataDone) {
                    // We test the existence of data
                    if (shouldType === 'exist') {
                        should.exist(data);
                    }

                    // We send data to next function without errors
                    processDataDone(null, data);
                }
            ],
            function(err, data) {
                // err is coming from the query
                if (shouldType === 'notexist') {
                    should.not.exist(data);
                } else {
                    should.exist(data);
                }
                done();
            });
    };


    // it('should create posts table in local pgdb in developement environment', function(done) {

    //     var querySettings = {
    //         action: 'CREATE TABLE "posts" ("content" varchar(100), "user_id" varchar(100))',
    //         value: ''
    //     };
    //     var shouldType = 'exist';

    //     asyncQueryShould(done, querySettings, shouldType);
    // });

    it('should insert rows into posts table in local pgdb in developement environment', function(done) {

        var querySettings = {
            action: 'INSERT INTO "posts" ("content", "user_id") VALUES ($1, $2),($3, $4)',
            value: ['seb', '1', 'Manu', '2']
        };
        var shouldType = 'exist';

        asyncQueryShould(done, querySettings, shouldType);
    });


    it('should read rows from posts table in local pgdb in developement environment', function(done) {

        var querySettings = {
            action: 'SELECT * FROM posts ORDER BY user_id ASC',
            value: ''
        };
        var shouldType = 'exist';

        asyncQueryShould(done, querySettings, shouldType);
    });



    // it('should drop posts table in local pgdb in developement environment', function(done) {

    //     var querySettings = {
    //         action: 'DROP TABLE "posts"',
    //         value: ''
    //     };
    //     var shouldType = 'exist';

    //     asyncQueryShould(done, querySettings, shouldType);
    // });

    // it('should not read from pgdb from inexisting table', function(done) {
    //     var querySettings = {
    //         action: 'SELECT * FROM inexisting',
    //         value: ''
    //     };
    //     var shouldType = "notexist";

    //     asyncQueryShould(done, querySettings, shouldType);
    // });









    // var querySettings = {
    //     action: 'INSERT INTO "posts" ("content", "user_id") VALUES ($1, $2)',
    //     value: ['seb', '1'],
    //     cbQuery: function(err, result) {
    //         should.exist(result);
    //     }
    // };



    // it('should create posts table in local pgdb in developement environment', function(done) {
    //     var querySettings = {
    //         action: 'CREATE TABLE "posts" ("content" varchar(100), "user_id" varchar(100))',
    //         value: '',
    //         cbQuery: function(err, result) {
    //             should.exist(result);
    //         }
    //     };
    //     query(done, querySettings);


    // });
    // it('should insert rows into posts table in local pgdb in developement environment', function(done) {
    //     var querySettings = {
    //         action: 'INSERT INTO "posts" ("content", "user_id") VALUES ($1, $2)',
    //         value: ['seb', '1'],
    //         cbQuery: function(err, result) {
    //             should.exist(result);
    //         }
    //     };
    //     query(done, querySettings);

    // });

    // it('should read rows into posts table in local pgdb in developement environment', function(done) {
    //     var querySettings = {
    //         action: 'SELECT * FROM posts ORDER BY user_id ASC',
    //         value: '',
    //         cbQuery: function(err, result) {
    //             should.exist(result);
    //         }
    //     };
    //     query(done, querySettings);
    // });

    // it('should delete rows of posts table in local pgdb in developement environment', function(done) {
    //     var querySettings = {
    //         action: 'DELETE FROM posts WHERE user_id=($1)',
    //         value: ['1'],
    //         cbQuery: function(err, result) {
    //             should.exist(result);
    //         }
    //     };
    //     query(done, querySettings);
    // });

    // it('should drop posts table in local pgdb in developement environment', function(done) {
    //     var querySettings = {
    //         action: 'DELETE FROM posts WHERE user_id=($1)',
    //         value: ['1'],
    //         cbQuery: function(err, result) {
    //             should.exist(result);
    //         }
    //     };
    //     query(done, querySettings);
    // });




    // it('should not read from pgdb from inexisting table', function(done) {
    //     var querySettings = setDefaultQuerySettings(done);
    //     querySettings.config = "";
    //     querySettings.text = 'SELECT COUNT(date) AS count FROM INCORRECT';
    //     querySettings.cbQuery = function(err, result) {
    //         should.exist(err);
    //     };
    //     query(querySettings);
    // });

});