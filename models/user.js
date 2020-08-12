const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
/**
 * Creates model for a user
 */
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
    },
    isAdmin: {
        type: Boolean
    }
})
/**
 * generates token on a valid login
 */
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin
    }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);
/**
 * checkf for validation of user object
 * @param {Object} user 
 */
module.exports.Validate = function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(7).max(255).required().email(),
        password: Joi.string().min(7).max(1024).required(),
        age: Joi.number().required(),
        isAdmin: Joi.boolean()
    })
    return schema.validate(user);
}

module.exports.User = User;