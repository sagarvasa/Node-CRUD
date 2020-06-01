const mongoose = require("mongoose");
const logger = require("./logger");
let connection;

let create_connection = (db_connection_obj, options) => {
    const { host, port, database, username, password } = db_connection_obj;
    let url = "mongodb://" + username + ":" + password + "@" + host + ":" + port + "/" + database;

    mongoose.connect(url, options).catch((err) => {
        logger.error('error in initially connecting database:: ' + err);
    });
    //mongoose.set('useCreateIndex', true);

    let connection = mongoose.connection;
    connection.on('error', function (err) {
        logger.error('db connection error event ' + err);
    })
    connection.on('connected', function () {
        logger.info('database connected successfully');
    })

    return connection;

    
}

module.exports = { create_connection }