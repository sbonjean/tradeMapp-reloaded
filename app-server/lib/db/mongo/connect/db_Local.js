var mongoose = require('mongoose'); // Requires Mongoose module

// Connects to local database
var connection = mongoose.createConnection('mongodb://localhost/tradeMapp');

console.log("using local computer DB");

module.exports = connection; // Exports Mongoose connection
