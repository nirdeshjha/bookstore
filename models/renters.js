const Joi = require('joi');
const mongoose = require('mongoose');


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
        type: String
    },
    returningDate: {
        type: String
    },
    price: {
        type: Number
    }
}));

module.exports.validate = function validateRenter(renting) {
    const schema = Joi.object({
        userId: Joi.string(),
        bookId: Joi.string(),
        rentingDate: Joi.string(),
        returningDate: Joi.string(),
        price: Joi.number()
    })
    return schema.validate(renting);
}

module.exports.Rented = Rented;