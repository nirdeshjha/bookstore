const Joi = require('joi');
const mongoose = require('mongoose');

/**
 * Model for renter
 */
const Rented = mongoose.model('Rent', new mongoose.Schema({
    userId: {
        type: String,
        //required: true,
        minlength: 24
    },
    bookId: {
        type: String,
        //required: true,
        minlength: 24
    },
    rentingDate: {
        type: String,
        required: true
    },
    returningDate: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}));

/**
 * Check for validation of a Rented object
 * @param {Object} renting 
 */

module.exports.validate = function validateRenter(renting) {
    const schema = Joi.object({
        userId: Joi.string(),
        bookId: Joi.string(),
        rentingDate: Joi.string().required(),
        returningDate: Joi.string().required(),
        price: Joi.number().required()
    })
    return schema.validate(renting);
}

module.exports.Rented = Rented;