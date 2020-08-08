const Joi = require('joi');
const mongoose = require('mongoose');

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
        required: true,
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

function validateBook(book) {
    const schema = {
        title: Joi.string().min(5).max(200).required(),
        genre: Joi.array().required(),
        author: Joi.string().min(3).max(200).required(),
        publishingDate: Joi.date().required(),
        ageAppropriationRange: Joi.number().required(),
        numberOfCopies: Joi.number().required(),
        rentalRate: Joi.number().required()
    };
    return Joi.validate(book, schema);
}

exports.Book = Book;
exports.validate = validateBook;