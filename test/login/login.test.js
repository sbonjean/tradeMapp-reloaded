/**
 * Created by sebastienbonjean on 5/20/16.
 */

var expect = require('chai').expect;
var request = require('supertest');
var cheerio = require('cheerio');

var layout = require('../../server/routes/login/layout.json');
var app = require('../../app.js');


// describe('login page', function () {
//
//     var $;
//
//     it('should load login page', function (done) {
//         request(app).get("/login").expect(200).end(function (err, res) {
//             $ = cheerio.load(res.text);
//             done();
//         });
//     });
//
//     it('should have an input for login', function () {
//         var loginInputType = $('input[id="login"]').attr('type');
//         expect(loginInputType).to.equal('text');
//     });
//
//
//     it('should have an input for password', function () {
//         var passwordInputType = $('input[id="password"]').attr('type');
//         expect(passwordInputType).to.equal('password');
//     });
//
//     it('should have a submit button', function () {
//         var passwordInputType = $('input[id="log_in"]').attr('type');
//         expect(passwordInputType).to.equal('submit');
//     });
//
//
//     it('should be able to display message', function () {
//         var messageDiv = $(#message);
//         expect(messageDiv).to.exist();
//     });
//
// });


describe('login authentication check', function () {

    /*

    it('should return error message when "login" is empty', function (done) {
        request(app)
            .post("/login")
            .expect(200)
            .send({login: ''})
            .send({password: 'notarealpassword'})
            .end(function (err, res) {
                $ = cheerio.load(res.text);
                var message = $('#message').html();
                expect(message).to.equal(layout.english.content.emptyFieds);
                done();
            });
    });

    it('should return error message when "password" is empty', function (done) {
        request(app)
            .post("/login")
            .expect(200)
            .send({login: 'not a real login'})
            .send({password: ''})
            .end(function (err, res) {
                $ = cheerio.load(res.text);
                var message = $('#message').html();
                console.log(message);
                expect(message).to.equal(layout.english.content.emptyFieds);
                done();
            });
    });


    it('should return error message when "password" and "login" are empty', function (done) {
        request(app)
            .post("/login")
            .expect(200)
            .send({login: ''})
            .send({password: ''})
            .end(function (err, res) {
                $ = cheerio.load(res.text);
                var message = $('#message').html();
                expect(message).to.equal(layout.english.content.emptyFieds);
                done();
            });
    });


    it('should return error message when incorrect login is submitted', function (done) {
        request(app)
            .post("/login")
            .expect(200)
            .send({login: 'notareallogin'})
            .send({password: 'notarealpassword'})
            .end(function (err, res) {
                $ = cheerio.load(res.text);
                var message = $('#message').html();
                expect(message).to.equal(layout.english.content.userNotFound);
                done();
            });
    });
*/

/*

    it('should return error message when "login" is not valid input', function (done) {
        request(app)
            .post("/login")
            .expect(200)
            .send({login: 'thislogineistoolongthislogineistoolongthislogineistoolongthislogineistoolongthislogineistoolong'})
            .send({password: 'notarealpassword'})
            .end(function (err, res) {
                $ = cheerio.load(res.text);
                var message = $('#message').html();
                expect(message).to.equal(layout.english.content.unvalidFields);
                done();
            });
    });

    it('should return error message when "password" is not valid input', function (done) {
        request(app)
            .post("/login")
            .expect(200)
            .send({login: 'notareallogin'})
            .send({password: 'thislogineistoolongthislogineistoolongthislogineistoolongthislogineistoolongthislogineistoolong'})
            .end(function (err, res) {
                $ = cheerio.load(res.text);
                var message = $('#message').html();
                expect(message).to.equal(layout.english.content.unvalidFields);
                done();
            });
    });

*/


});


it('should return error message when incorrect "password" is submitted ', function (done) {
    request(app)
        .post("/login")
        .expect(200)
        .send({login: 'test8-2U@inactiveSubscription.com'})
        .send({password: 'notacorrectpassword'})
        .end(function (err, res) {
            $ = cheerio.load(res.text);
            var message = $('#message').html();
            expect(message).to.equal(layout.english.content.subscriptionToRenew);
            done();
        });
});


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