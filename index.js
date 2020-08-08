const books = require('./routes/books');
const users = require('./routes/users');
const rented = require('./routes/rented');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/bookstore')
    .then(() => console.log('connected to MongoDb...'))
    .catch((err) => console.error('Could not connect to MongoDb...'));

app.use(express.json());
app.use('/api/books', books);
app.use('/api/rented', rented);
app.use('/api/users', users);

module.exports = app;