const { validationResult, body, param } = require("express-validator");

exports.insert_movie = [
    body("title")
        .exists()
        .trim()
        .not().isEmpty().withMessage("movie title should not be empty")
        .isLength({ min: 2, max: 100 }).withMessage("movie title should have minimun 1 and maximum 100 characters"),
    body("release_year")
        .exists()
        .trim()
        .custom(value => {
            return parseInt(value)
        })
        .isLength({ min: 4, max: 4 })
        .withMessage("invalid year format"),
    body("locations")
        .exists()
        .trim()
        .not().isEmpty().withMessage("location should not be empty"),
    body("fun_facts")
        .optional()
        .trim(),
    body("production_company")
        .optional()
        .trim()
        .not().isEmpty().withMessage("production_company should not be empty"),
    body("distributor")
        .optional()
        .trim(),
    body("writer")
        .exists()
        .trim()
        .notEmpty().withMessage("Writer can not be empty"),
    body("actor_1")
        .exists().withMessage("actor 1 field is missing")
        .trim()
        .notEmpty().withMessage("actor 1 can not be empty")
        .isLength({ min: 2, max: 30 }).withMessage("actor name should have minimum 1 and max 30 characters"),
    body("actor_2")
        .optional()
        .trim()
        .notEmpty().withMessage("actor 1 can not be empty")
        .isLength({ min: 2, max: 30 }).withMessage("actor name should have minimum 1 and max 30 characters"),
    body("actor_3")
        .optional()
        .trim()
        .notEmpty().withMessage("actor 1 can not be empty")
        .isLength({ min: 2, max: 30 }).withMessage("actor name should have minimum 1 and max 30 characters"),
],

exports.update_movie = [
    param("id")
        .exists().withMessage("id is required field")
        .trim()
        .notEmpty()
        .isLength({ min: 2, max: 24 }).withMessage("invalid value for id"),
    body("title")
        .optional()
        .trim()
        .not().isEmpty().withMessage("movie title should not be empty")
        .isLength({ min: 2, max: 100 }).withMessage("movie title should have minimun 1 and maximum 100 characters"),
    body("release_year")
        .optional()
        .trim()
        .custom(value => {
            return parseInt(value)
        })
        .isLength({ min: 4, max: 4 })
        .withMessage("invalid year format"),
    body("locations")
        .optional()
        .trim()
        .not().isEmpty().withMessage("location should not be empty"),
    body("fun_facts")
        .optional()
        .trim(),
    body("production_company")
        .optional()
        .trim()
        .not().isEmpty().withMessage("production_company should not be empty"),
    body("distributor")
        .optional()
        .trim(),
    body("writer")
        .optional()
        .trim()
        .notEmpty().withMessage("Writer can not be empty"),
    body("actor_1")
        .optional()
        .trim()
        .notEmpty().withMessage("actor 1 can not be empty")
        .isLength({ min: 2, max: 30 }).withMessage("actor name should have minimum 1 and max 30 characters"),
    body("actor_2")
        .optional()
        .trim()
        .notEmpty().withMessage("actor 1 can not be empty")
        .isLength({ min: 2, max: 30 }).withMessage("actor name should have minimum 1 and max 30 characters"),
    body("actor_3")
        .optional()
        .trim()
        .notEmpty().withMessage("actor 1 can not be empty")
        .isLength({ min: 2, max: 30 }).withMessage("actor name should have minimum 1 and max 30 characters"),
],

exports.get_movie_by_id = [
    param("id")
        .exists().withMessage("id is required field")
        .trim()
        .notEmpty()
        .isLength({ min: 2, max: 24 }).withMessage("invalid value for id")
],

exports.delete_movie = [
    param("id")
        .exists().withMessage("id is required field")
        .trim()
        .notEmpty()
        .isLength({ min: 2, max: 24 }).withMessage("invalid value for id")
],

exports.validate = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ error: errors.array() })
    }
    next()
}
