const logger = require("../../utility/logger");
const MovieModel = require("../models/movie");
const query_helper = require("../../helper/query");

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

        options.validateBeforeSave = true;

        let return_data = await query_helper.insert(MovieModel, movie_obj, options).catch((err) => {
            return res.status(500).send({ message: err.message });
        })
        logger.info("insert movie response "+ JSON.stringify(return_data), res)
        return res.status(200).send(return_data)
    } catch (e) {
        logger.error("insert movie:: catch block " + e.message, res);
        return res.status(500).send({ message: err.message });
    }

}

const get_all_movies = (req, res) => {
    logger.info("get all movie starts", res);

}

const update_movie = async (req, res) => {
    try {
        logger.info("update movie starts", res);
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
        options.new = true;
        options.multi = true;

        let return_data = await query_helper.update_doc(MovieModel, movie_obj, condition, options)
            .catch((err) => {
                return res.status(err.status || 500).send({ message: err.message });
            })
        logger.info("update movie response "+ JSON.stringify(return_data), res)
        return res.status(200).send(return_data)
    } catch (e) {
        logger.error("update movie:: catch block " + e.message, res);
        return res.status(500).send({ message: err.message });
    }

}

const get_movie_by_id = (req, res) => {
    logger.info("get movie by id starts", res);

}

const delete_movie = async (req, res) => {
    try {
        logger.info("delete movie starts", res);
        let options = {};
        let condition = {};

        condition.id = req.params.id
        options.projection = { _id: 1 }

        let return_data = await query_helper.delete_doc(MovieModel, condition, options)
            .catch((err) => {
                return res.status(err.status || 500).send({ message: err.message });
            })
        logger.info("delete movie response "+ JSON.stringify(return_data), res)
        return res.status(200).send({ message: "successfully deleted" })
    } catch (e) {
        logger.error("update movie:: catch block " + e.message, res);
        return res.status(500).send({ message: err.message });
    }

}

const load_all_movies = (req, res) => {
    logger.info("insert movie starts", res);

}

module.exports = { insert_movie, get_all_movies, update_movie, get_movie_by_id, delete_movie, load_all_movies }