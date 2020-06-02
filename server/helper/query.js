const logger = require("../utility/logger");

function query_record(MovieModel, query, projections, options) {
    return new Promise(async (resolve) => {
        try {
            let sort = {};
            let limit, skip
            if (options.sort) {
                sort = options.sort
            }
            if(options.offset) {
                skip = options.skip 
            }

            if(options.limit) {
                limit = options.limit
            }

            let data = MovieModel.find(query, projections, options).collation({ locale: "en" })
                .skip(skip)
                .limit(limit)
                .sort(sort);
            resolve(data);
        } catch (err) {
            logger.error("error in quering document " + err)
            resolve(null)
        }
    })
}

function insert(MovieModel, movie_obj, options) {
    return new Promise(async (resolve, reject) => {
        try {
            let model = new MovieModel(movie_obj);
            let data = await model.save(options);
            resolve(data);
        } catch (err) {
            logger.error("error in saving document " + err);
            if (err.code == 11000) {
                reject({ status: 409, message: "duplicate entry" });
            }
            reject(err)
        }
    })
}

function update_doc(MovieModel, update_data, condition, options) {
    return new Promise(async (resolve, reject) => {
        try {
            let filtered_condition = {}

            if (condition.id) {
                filtered_condition._id = condition.id
            } else {
                filtered_condition = condition
            }

            update_data_obj = { $set: update_data };
            let data = await MovieModel.findOneAndUpdate(filtered_condition, update_data_obj, options)
            if (data == null) {
                let err = new Error("document not found, please send correct input params");
                err.status = 400;
                reject(err);
            }
            resolve(data);
        } catch (err) {
            logger.error("error in updating document " + err)
            if (err.code == 11000) {
                reject({ status: 409, message: "duplicate entry" });
            }
            reject(err)
        }
    })
}

function delete_doc(MovieModel, condition, options) {
    return new Promise(async (resolve, reject) => {
        try {
            let filtered_condition = {}

            if (condition.id) {
                filtered_condition._id = condition.id
            } else {
                filtered_condition = condition
            }

            let data = await MovieModel.findOneAndDelete(condition, options)
            if (data == null) {
                let err = new Error("document not found, please send correct input params");
                err.status = 400;
                reject(err);
            }
            resolve(data);
        } catch (err) {
            logger.error("error in deleting document " + err)
            reject(err)
        }
    })
}

module.exports = { query_record, insert, update_doc, delete_doc }