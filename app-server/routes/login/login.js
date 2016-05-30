/**
 * Created by sebastienbonjean on 5/22/16.
 */

var async = require('async');
var query = require("../../lib/db/pg/connect/connect.js");
var isempty = require('is-empty');

var renderInfo = {
    layout: require('./layout.json'),
    env: process.env.NODE_ENV,
    language: "en",
    message: ""
};


var main = function (app) {

    app.get('/login', function (req, res) {
        res.render('login/login', renderInfo);
    });

    app.post('/login', function (req, res) {


        // TO DO transfom input in safe format
        // Empty input
        if (isempty(req.body.password) || isempty(req.body.login)) {
            renderInfo.message = renderInfo.layout.english.content.emptyFieds;
            res.render('login/login', renderInfo);
            return;
        }

        // To big input
        if (req.body.password.length > 39 || req.body.login.length > 39 ) {
            renderInfo.message = renderInfo.layout.english.content.unvalidFields;
            res.render('login/login', renderInfo);
            return;
        }

        // TODO get req language
        async.waterfall([

                function (doneQuery) {

                    query(doneQuery, {
                        action: 'SELECT "user"."password", "user"."lan", "subscription"."state" FROM "user" INNER JOIN "subscription" ON ("user"."subscriptionid" = "subscription"."subscriptionid") WHERE login=$1',
                        value: [req.body.login]
                    });

                }
            ],
            function (err, result) {
//                console.log(err);
  //              console.log(result);
                if (err) {
                    renderInfo.message = renderInfo.layout.english.content.connectionPb;
                    res.render('login/login', renderInfo);
                    return;
                }
                if (isempty(result.rows)) {
                    renderInfo.message = renderInfo.layout.english.content.userNotFound;
                    res.render('login/login', renderInfo);
                    return;
                }
                if (result.rows.state === "inactive") {
                    renderInfo.message = renderInfo.layout.english.content.subscriptionToRenew;
                    res.render('login/login', renderInfo);
                    return;
                }
                if (req.body.password !== result.rows.passwordIncorrect) {
                    renderInfo.message = renderInfo.layout.english.content.subscriptionToRenew;
                    res.render('login/login', renderInfo);
                    return;
                }

                // TODO redirect to dashbards

            });


    });


};

module.exports = main;

