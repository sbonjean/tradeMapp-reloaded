/**
 * Created by sebastienbonjean on 5/20/16.
 */

var request = require("supertest");
var app = require('../../app.js');


// TODO should have login and password fields in login page
// TODO should through error when incorrect login submitted
// TODO should through error when incorrect password submitted
// TODO should log cookie if correct password and login submitted
// TODO should access application if correct password and login submitted
// TODO should send message to administrator if multiple failed access attempt


describe('login', function() {

    it("Loads the home page", function(done) {
        request(app).get("/login").expect(200).end(done);
    });
    

});











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