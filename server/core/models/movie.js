var mongoose = require('mongoose');
var { Schema } = mongoose;

var movieSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    release_year: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid year`
        },
    },
    locations: {
        type: String
    },
    fun_facts: {
        type: String
    },
    production_company: {
        type: String
    },
    distributor: {
        type: String
    },
    director: {
        type: String
    },
    writer: {
        type: String,
        required: true,
        trim: true
    },
    actor_1: {
        type: String,
        required: true,
        trim: true
    },
    actor_2: {
        type: String
    },
    actor_3: {
        type: String
    }
})

var MovieModel = mongoose.model('movie', movieSchema);

module.exports = MovieModel;
