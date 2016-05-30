//Configuration details of Heroku Postgres database

var chalk = require('chalk');

var connection = {
    user: "vsxtaehejsqaxb",
    password: "68_G8UqFOCAk3FuWkVimF6DqJ1",
    database: "d2rvr0rn7ne19b",
    port: 5432,
    host: "ec2-107-20-177-12.compute-1.amazonaws.com",
    ssl: true
};

console.log("running " + chalk.inverse("psql Heroku") + " DB");



module.exports = connection; // Exports Mongoose connection