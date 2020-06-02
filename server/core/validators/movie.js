const { validationResult, body, param} = require("express-validator");

const insert_movie = () => {
    let arr = [
        body("title")
            .exists()
            .trim()
            .notEmpty()
            .withMessage("movie title can not be empty")
            .isLength({ min: 2, max: 100 }),
        body("release_year")
            .exists()
            .trim()
            .custom(value => {
                return parseInt(value)
            })
            .isLength({ min: 4, max: 4 })
            .withMessage("invalid year format"),
        body("locations")
            .optional()
            .trim(),
        body("fun_facts")
            .optional()
            .trim(),
        body("production_company")
            .optional()
            .trim(),
        body("distributor")
            .optional()
            .trim(),
        body("writer")
            .exists()
            .trim()
            .notEmpty()
            .withMessage("Writer can not be empty"),
        body("actor_1")
            .exists()
            .withMessage("actor 1 field is missing")
            .trim()
            .notEmpty()
            .withMessage("actor 1 can not be empty")
            .isLength({ min: 2, max: 30 })
            .withMessage("invalid value for actor 1"),
        body("actor_2")
            .optional()
            .trim()
            .isLength({ min: 2, max: 30 }),
        body("actor_3")
            .optional()
            .trim()
            .isLength({ min: 2, max: 30 })
    ]
    return arr;
}

const update_movie = () => {
    let arr = [
        param("id")
            .exists()
            .withMessage("id is required field")
            .trim()
            .notEmpty()
            .isLength({min: 2, max: 24})
            .withMessage("invalid value for id")
    ]
    return arr;
}

const get_movie_by_id = () => {
    let arr = [
        param("id")
            .exists()
            .withMessage("id is required field")
            .trim()
            .notEmpty()
            .isLength({min: 2, max: 24})
            .withMessage("invalid value for id")
    ]
    return arr;
}

const delete_movie = () => {
    let arr = [
        param("id")
            .exists()
            .withMessage("id is required field")
            .trim()
            .notEmpty()
            .isLength({min: 2, max: 24})
            .withMessage("invalid value for id")
    ]
    return arr;
}

const validate = (req, res, next) => {
    let errors = validationResult(req);
    if(! errors.isEmpty()) {
        return res.status(422).send({error: errors.array()})
    }
    next()
}

module.exports = { insert_movie, update_movie, get_movie_by_id, delete_movie, validate }