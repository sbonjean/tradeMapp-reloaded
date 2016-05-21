var mongoose = require('mongoose'); // Requires Mongoose module


// ---------------------------------------
// Connection method to only one database
//mongoose.connect('mongodb://sbonjean:ytzT*98-sd@troup.mongohq.com:10093/tradeMapp'); // Connects to the database
//module.exports = mongoose.connection; // Exports Mongoose connection

// ---------------------------------------
// Connection method to several databases

// * Developement Database
//var connection = mongoose.createConnection('mongodb://sbonjean:ytzT*98-sd@troup.mongohq.com:10093/tradeMapp'); // Connects to the database development

//  * Production database
var connection = mongoose.createConnection('mongodb://sbonjean:ytzT*98-sd@lamppost.5.mongolayer.com:10100,lamppost.4.mongolayer.com:10100/tradeMappProd'); // Connects to the database

console.log("running mongo HQ production DB");



module.exports = connection; // Exports Mongoose connection
