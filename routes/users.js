const {
    Validate,
    User
} = require('../models/user');
const _ = require('lodash');
const auth = require('../middlewares/auth');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    res.send(_.pick(user, ['_id', 'name', 'email', 'age']));
})

router.post('/register', async (req, res) => {
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
})

const validateSchema = function (req) {
    const schema = Joi.object({
        email: Joi.string().min(7).max(255).required().email(),
        password: Joi.string().min(7).max(1024).required()
    })
    return schema.validate(req);
}

router.post('/login', async (req, res) => {
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
})

module.exports = router;