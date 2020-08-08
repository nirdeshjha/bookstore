//const Joi = require('joi');
const mongoose = require('mongoose');

const Rented = mongoose.model('Rented', new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 24
    },
    rentingDate: {
        type: Array
    },
    returningDate: {
        type: Array
    },
    charge: {
        Type: Array
    }
}))

exports.Rented = Rented;