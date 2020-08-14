const {
    Validate,
    User
} = require('../models/user');
const _ = require('lodash');
const asyncMiddleware = require('../middlewares/async');
const auth = require('../middlewares/auth');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


/**
 * It returns information about the current user.
 * If user wants to edit any of the information provided that can be done.
 */
router.get('/me', auth, asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.send(_.pick(user, ['_id', 'name', 'email', 'age']));
}))


/**
 * Returns a token and register him to our service If user provides valid information.
 *
 */
router.post('/register', asyncMiddleware(async (req, res) => {
    const {
        error
    } = Validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    });
    if (user) return res.status(400).send('User with given email already exist');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age
    })
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email', 'age']));
}))


/**
 * validtes the body send by the client
 * @param {object} req 
 */
const validateSchema = function (req) {
    const schema = Joi.object({
        email: Joi.string().min(7).max(255).required().email(),
        password: Joi.string().min(7).max(1024).required()
    })
    return schema.validate(req);
}


/**
 * Allows the user to login
 */

router.post('/login', asyncMiddleware(async (req, res) => {
    const {
        error
    } = validateSchema(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    })
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.send(token);
}))

module.exports = router;