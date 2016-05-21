/**
 * Created by sebastienbonjean on 5/20/16.
 */

var expect = require('chai').expect;
var request = require("supertest");
var app = require('../../app.js');
var cheerio = require("cheerio");


describe('login page', function () {

    var $;

    it("should load login page", function (done) {
        request(app).get("/login").expect(200).end(function (err, res) {
            $ = cheerio.load(res.text);// expect(passwordInputType).to.equal("password");
            done();
        });
    });

    it("should have an input for login", function (done) {
        var loginInputType = $("input[id='login']").attr('type');
        expect(loginInputType).to.equal("text");
        done();
    });


    it("should have an input for password", function (done) {
        var passwordInputType = $("input[id='password']").attr('type');
        expect(passwordInputType).to.equal("password");
        done();
    });

    it("should have a submit button", function (done) {
        var passwordInputType = $("input[id='log_in']").attr('type');
        expect(passwordInputType).to.equal("submit");
        done();
    });

});



// TODO should display error message when incorrect login submitted
// TODO should display error message when incorrect password submitted
// TODO should log cookie if correct password and login submitted
// TODO should access application if correct password and login submitted
// TODO should send message to administrator if multiple failed access attempt



// var server = require('../server.js');
//
// describe('User visits login page', function() {
//
//
//
//
//     before(function(done) {
//
//         done();
//
//     });
//
//
//     Browser.localhost('trademapp.com', 3000);
//
//     const browser = new Browser();
//
//
//     describe('submits form', function() {
//         "use strict";
//
//         before(function(done) {
//             browser.visit('http://localhost:3000/logins', done);
//         });
//
//
//         //
//         // before(function(done) {
//         //     browser.visit("http://localhost:3000/logins", function () {
//         //         assert.ok(browser.success);
//         //         done();
//         //     });
//         // });
//         //
//         // it('should not be equal',function () {
//         //     should.notEqual(true,false)
//         // });
//
//
//         it('should see welcome page', function() {
//             browser.assert.text('body', 'Hello World');
//         });
//
//
//     });
//
//
//
// });