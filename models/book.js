const Joi = require('joi');
const mongoose = require('mongoose');

/**
 * Model schema for a book
 */

const Book = mongoose.model('Books', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 200
    },
    genre: {
        type: Array,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 200
    },
    author: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200
    },
    publishingDate: {
        type: Date,
        //required: true,
    },
    ageAppropriationRange: {
        type: Number,
        required: true
    },
    numberOfCopies: {
        type: Number,
        required: true
    },
    rentalRate: {
        type: Number,
        required: true
    }
}));

/**
 * Check for validation of a book object
 * @param {Object} book 
 */
function validateBook(book) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(200).required(),
        genre: Joi.array().required(),
        author: Joi.string().min(3).max(200).required(),
        publishingDate: Joi.date(),
        ageAppropriationRange: Joi.number().required(),
        numberOfCopies: Joi.number().required(),
        rentalRate: Joi.number().required()
    });

    return schema.validate(book);
}

exports.Book = Book;
exports.validate = validateBook;