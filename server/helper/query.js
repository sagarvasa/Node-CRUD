const logger = require("../utility/logger");

function query_record(MovieModel, query, projections, options) {
    return new Promise(async (resolve, reject) => {
        try {
            let sort = {};
            let limit, skip
            if (options.sort) {
                sort = options.sort
                //delete options.sort
            }
            if(options.offset) {
                skip = parseInt(options.offset)
                //delete options.offset
            }

            if(options.limit) {
                limit = parseInt(options.limit)
                //delete options.limit
            }

            let data = await MovieModel.find(query, projections, options).collation({ locale: "en" })
                .skip(skip)
                .limit(limit)
                .sort(sort);
            resolve(data);
        } catch (err) {
            logger.error("error in quering document " + err)
            reject(err)
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

            //mongoose 5.9 internally does $set hence not require explicitly
            update_data_obj = { $set: update_data };
            let data = await MovieModel.findOneAndUpdate(filtered_condition, update_data, options)
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

function bulk_insert(MovieModel, movie_arr, options) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await MovieModel.insertMany(movie_arr, options)
            resolve(data);
        } catch (err) {
            logger.error("error in saving documents " + err);
            if (err.code == 11000) {
                reject({ status: 409, message: "duplicate entry" });
            }
            reject(err)
        }
    })
}

function bulk_update(MovieModel, update_data, condition, options) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await MovieModel.updateMany(condition, update_data, options)
            if (data == null) {
                let err = new Error("document not found, please send correct input params");
                err.status = 400;
                reject(err);
            }
            resolve(data);
        } catch (err) {
            logger.error("error in updating documents " + err)
            if (err.code == 11000) {
                reject({ status: 409, message: "duplicate entry" });
            }
            reject(err)
        }
    })
}

module.exports = { query_record, insert, update_doc, delete_doc, bulk_insert, bulk_update }