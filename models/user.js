const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 1024
    },
    age: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', userSchema);

module.exports.validate = function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(7).max(255).required().email(),
        password: Joi.string().min(7).max(1024).required(),
        age: Joi.number().required()
    }
    Joi.validate(user, schema);
}

module.exports.User = User;