// * Localhost Database

var chalk = require('chalk');

//var conString = "postgres://username:password@localhost/database";
var conString = "postgres://postgres:postgres@localhost:5432/test";

console.log("running " + chalk.inverse("psql localhost") + " DB");

module.exports = conString; // Exports Mongoose connection