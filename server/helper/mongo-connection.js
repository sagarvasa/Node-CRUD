const logger = require("../utility/logger");
const db_config = require("../../config/db");
const mongoose = require("../utility/mongoose");

let client = null; //This object will hold connection objection for connection pooling

// Connection will be established when app bootstraps
let establish_connection = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const db_connection_obj = {host, port, database, username, password} = db_config
            let options = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                poolSize: db_config.pool_size,
                socketTimeoutMS: db_config.timeout,
                useFindAndModify: false
            }
            client = await mongoose.create_connection(db_connection_obj, options);
            resolve(client)
        } catch (error) {
            logger.error("Establish connection error " + error);
            reject(error);
        }
    });
};

let get_connection = () => {
    return new Promise((resolve, reject) => {
        try {
            if (!client) {
                return reject({ message: 'Please establish connection first' });
            }
            let db = client.db(db_config.database);
            return resolve({ client, db });
        } catch (err) {
            logger.info("Get connection error " + err);
            reject(err);
        }
    });
};


let close_connection = (client) => {
    try {
        if (client) {
            client.close();
        }
    } catch (err) {
        logger.info("Close connection error " + err);
    } finally {
        return true;
    }
};

module.exports = {establish_connection, get_connection, close_connection}

