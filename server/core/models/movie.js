var mongoose = require('mongoose');
var { Schema } = mongoose;

var movieSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        index: false //setting individual index to false
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
        type: String,
        required: true,
        index: false
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
        type: String,
        lowercase: true
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
}, {timestamps: true, strict: false})

movieSchema.index({title: 1, locations: 1}, {unique: true}) //creating unique compund index

movieSchema.pre("save", (next) => {
    MovieModel.count(function (err, count) {
        console.log("Err states before saving: "+ err);
        console.log("no of document before saving: "+ count);
        next();
    })
})

var MovieModel = mongoose.model('movie', movieSchema);

module.exports = MovieModel;
