const logger = require("../../utility/logger");
const MovieModel = require("../models/movie");
const query_helper = require("../../helper/query");
const seeder = require("../../../seeder/movie.json");

const insert_movie = async (req, res) => {
    try {
        logger.info("insert movie starts", res);
        let movie_obj = {};
        let options = {};

        if (req.body.title) {
            movie_obj.title = req.body.title
        }
        if (req.body.release_year) {
            movie_obj.release_year = req.body.release_year
        }
        if (req.body.locations) {
            movie_obj.locations = req.body.locations
        }
        if (req.body.production_company) {
            movie_obj.production_company = req.body.production_company
        }
        if (req.body.director) {
            movie_obj.director = req.body.director
        }
        if (req.body.writer) {
            movie_obj.writer = req.body.writer
        }
        if (req.body.actor_1) {
            movie_obj.actor_1 = req.body.actor_1
        }
        if (req.body.actor_2) {
            movie_obj.actor_2 = req.body.actor_2
        }
        if (req.body.actor_3) {
            movie_obj.actor_3 = req.body.actor_3
        }
        if (req.body.fun_facts) {
            movie_obj.fun_facts = req.body.fun_facts
        }
        if (req.body.distributor) {
            movie_obj.distributor = req.body.distributor
        }

        options.validateBeforeSave = true;

        let return_data = await query_helper.insert(MovieModel, movie_obj, options)
        logger.info("insert movie response " + JSON.stringify(return_data), res)
        return res.status(200).send({ data: return_data })
    } catch (e) {
        logger.error("insert movie:: catch block " + e.message, res);
        return res.status(500).send({ message: e.message });
    }

}

const get_all_movies = async (req, res) => {
    try {
        logger.info("get all movie starts", res);
        let options = {};
        let query = {};
        let projections = {};
        let sort = {};

        if (req.query.title) {
            query.title = { $regex: req.query.title, $options: "$i" }; //case insensitive search
        }
        if (req.query.release_year) {
            query.release_year = { $eq: req.query.release_year } //exact match
        }
        if (req.query.locations) {
            query.locations = req.query.locations
        }
        if (req.query.production_company) {
            query.production_company = req.query.production_company
        }
        if (req.query.director) {
            query.director = req.query.director
        }
        if (req.query.writer) {
            query.writer = req.query.writer
        }
        if (req.query.actor_1) {
            query.actor_1 = { $regex: req.query.actor_1, $options: "$i" };
        }
        if (req.query.actor_2) {
            query.actor_2 = req.query.actor_2
        }
        if (req.query.actor_3) {
            query.actor_3 = req.query.actor_3
        }
        if (req.query.fun_facts) {
            query.fun_facts = req.query.fun_facts
        }
        if (req.query.distributor) {
            query.distributor = req.query.distributor
        }


        //options query
        let sort_by = req.headers.sort_by
        let sort_value = req.headers.sort_val === "desc" ? -1 : 1;
        sort[sort_by] = sort_value

        options.limit = req.headers.limit;
        options.offset = req.headers.offset;
        options.sort = sort;

        let return_data = await query_helper.query_record(MovieModel, query, projections, options)
        logger.info("get all movie response " + JSON.stringify(return_data), res)
        return res.status(200).send({ data: return_data })
    } catch (e) {
        logger.error("get all movie:: catch block " + e.message, res);
        return res.status(500).send({ message: e.message });
    }

}

const update_movie_by_id = async (req, res) => {
    try {
        logger.info("update movie by id starts", res);
        let movie_obj = {};
        let options = {};
        let condition = {};

        if (req.body.title) {
            movie_obj.title = req.body.title
        }
        if (req.body.release_year) {
            movie_obj.release_year = req.body.release_year
        }
        if (req.body.locations) {
            movie_obj.locations = req.body.locations
        }
        if (req.body.production_company) {
            movie_obj.production_company = req.body.production_company
        }
        if (req.body.director) {
            movie_obj.director = req.body.director
        }
        if (req.body.writer) {
            movie_obj.writer = req.body.writer
        }
        if (req.body.actor_1) {
            movie_obj.actor_1 = req.body.actor_1
        }
        if (req.body.actor_2) {
            movie_obj.actor_2 = req.body.actor_2
        }
        if (req.body.actor_3) {
            movie_obj.actor_3 = req.body.actor_3
        }

        condition.id = req.params.id
        options.new = true; //to return updated document 
        options.multi = true; //deprecated, use updateMany
        options.runValidators = true; // to run validator on update

        let return_data = await query_helper.update_doc(MovieModel, movie_obj, condition, options)
        logger.info("update movie by id response " + JSON.stringify(return_data), res)
        return res.status(200).send({ data: return_data })
    } catch (e) {
        logger.error("update movie by id:: catch block " + e.message, res);
        return res.status(500).send({ message: e.message });
    }

}

const get_movie_by_id = async (req, res) => {
    try {
        logger.info("get movie by id starts", res);
        let options = {};
        let query = {};
        let projections = { production_company: 0 }; //not to send this field in response

        query["_id"] = req.params.id;

        let return_data = await query_helper.query_record(MovieModel, query, projections, options)
        logger.info("get movie by id response " + JSON.stringify(return_data), res)
        return res.status(200).send({ data: return_data })
    } catch (e) {
        logger.error("get movie by id:: catch block " + e.message, res);
        return res.status(500).send({ message: e.message });
    }

}

const delete_movie_by_id = async (req, res) => {
    try {
        logger.info("delete movie by id starts", res);
        let options = {};
        let condition = {};

        condition._id = req.params.id
        options.projection = { _id: 1 }

        let return_data = await query_helper.delete_doc(MovieModel, condition, options)
        logger.info("delete movie by id response " + JSON.stringify(return_data), res)
        return res.status(200).send({ message: "successfully deleted", data: return_data })
    } catch (e) {
        logger.error("delete movie by id:: catch block " + e.message, res);
        return res.status(500).send({ message: e.message });
    }

}

const load_all_movies = async (req, res) => {
    try {
        logger.info("load seeders data starts", res);
        let options = {};

        options.ordered = false; //Specifying whether the mongod instance should perform an ordered or unordered insert.
        //false --> unordered

        let return_data = await query_helper.bulk_insert(MovieModel, seeder, options)
        //logger.info("load seeders data response " + JSON.stringify(return_data), res)
        return res.status(200).send({ data: return_data })
    } catch (e) {
        logger.error("load seeders data:: catch block " + e.message, res);
        return res.status(500).send({ message: e.message });
    }

}

const update_by_query = async (req, res) => {
    try {
        logger.info("update by query data starts", res);
        let options = {};
        let query = {};
        let movie_obj = {};

        // Query filtering
        if (req.query.title) {
            query.title = { $regex: req.query.title, $options: "$i" }; //case insensitive search
        }
        if (req.query.release_year) {
            query.release_year = { $eq: req.query.release_year } //exact match
        }
        if (req.query.locations) {
            query.locations = req.query.locations
        }
        if (req.query.production_company) {
            query.production_company = req.query.production_company
        }
        if (req.query.director) {
            query.director = req.query.director
        }
        if (req.query.writer) {
            query.writer = req.query.writer
        }
        if (req.query.actor_1) {
            query.actor_1 = { $regex: req.query.actor_1, $options: "$i" };
        }
        if (req.query.actor_2) {
            query.actor_2 = req.query.actor_2
        }
        if (req.query.actor_3) {
            query.actor_3 = req.query.actor_3
        }
        if (req.query.fun_facts) {
            query.fun_facts = req.query.fun_facts
        }
        if (req.query.distributor) {
            query.distributor = req.query.distributor
        }


        if(Object.keys(query).length === 0) {
            return res.status(400).send({message: "please send valid parameters"})
        }

        //body filtering
        if (req.body.title) {
            movie_obj.title = req.body.title
        }
        if (req.body.release_year) {
            movie_obj.release_year = req.body.release_year
        }
        if (req.body.locations) {
            movie_obj.locations = req.body.locations
        }
        if (req.body.production_company) {
            movie_obj.production_company = req.body.production_company
        }
        if (req.body.director) {
            movie_obj.director = req.body.director
        }
        if (req.body.writer) {
            movie_obj.writer = req.body.writer
        }
        if (req.body.actor_1) {
            movie_obj.actor_1 = req.body.actor_1
        }
        if (req.body.actor_2) {
            movie_obj.actor_2 = req.body.actor_2
        }
        if (req.body.actor_3) {
            movie_obj.actor_3 = req.body.actor_3
        }

        options.new = true;
        options.runValidators = true;


        let return_data = await query_helper.bulk_update(MovieModel, movie_obj, query, options)
        logger.info("update by query data response " + JSON.stringify(return_data), res)
        return res.status(200).send({ data: return_data })
    } catch (e) {
        logger.error("update by query data:: catch block " + e.message, res);
        return res.status(500).send({ message: e.message });
    }

}

module.exports = { insert_movie, get_all_movies, update_movie_by_id, get_movie_by_id, delete_movie_by_id, load_all_movies, update_by_query}