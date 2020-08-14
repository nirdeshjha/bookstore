const config = require('config');
const books = require('./routes/books');
const users = require('./routes/users');
const rented = require('./routes/rented');
const error = require('./middlewares/error');
const mongoose = require('mongoose');
const express = require('express');
require('express-async-errors');
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

/**
 * Connect to mongo database
 */

mongoose.connect('mongodb://localhost/bookstore')
    .then(() => console.log('connected to MongoDb...'))
    .catch((err) => console.error('Could not connect to MongoDb...'));


/**
 * calling middlewares
 * It will either commplete the middleware or send the flow to another middleware
 */
app.use(express.json());
app.use('/api/books', books);
app.use('/api/rented', rented);
app.use('/api/users', users);
app.use(error);

module.exports = app;