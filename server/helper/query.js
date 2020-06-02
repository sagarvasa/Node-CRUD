const logger = require("../utility/logger");

function query_record(model, query, options) {
    return new Promise(async (resolve, reject) => {
        try {
            
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
            logger.error("error in saving document " + err)
            reject(err)
        }
    })
}

function update_doc(MovieModel, update_data, condition, options) {
    return new Promise(async (resolve, reject) => {
        try {
            let filtered_condition = {}

            if(condition.id) {
                filtered_condition._id = condition.id
            } else {
                filtered_condition = condition
            }

            update_data_obj = {$set: update_data};
            let data = await MovieModel.findOneAndUpdate(filtered_condition, update_data_obj, options)
            if(data == null) {
                let err = new Error("document not found, please send correct input params");
                err.status = 400;
                reject(err);
            }
            resolve(data);
        } catch (err) {
            logger.error("error in updating document " + err)
            reject(err)
        }
    })
}

function delete_doc(MovieModel, condition, options) {
    return new Promise(async (resolve, reject) => {
        try {
            let filtered_condition = {}

            if(condition.id) {
                filtered_condition._id = condition.id
            } else {
                filtered_condition = condition
            }

            let data = await MovieModel.findOneAndDelete(condition, options)
            if(data == null) {
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