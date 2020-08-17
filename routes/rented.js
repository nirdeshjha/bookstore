const asyncMiddleware = require('../middlewares/async');
const auth = require('../middlewares/auth');
const {
    validate,
    Rented
} = require('../models/renters');
const {
    checkForBookWithUser,
    bookAvailableAfter,
    rentBook,
    rentedBooksByUser,
    totalInvestment
} = require('../service/rented');
const express = require('express');
const router = express.Router();

/**
 * Upadtes the rented model when a book is rented by a user
 */

router.post('/:id/rentBook', auth, asyncMiddleware(async (req, res) => {

    const thisDate = await checkForBookWithUser(req);
    if (thisDate) return res.status(400).send('The given book is already with you till ' + thisDate);

    const availableAfter = await bookAvailableAfter(req);
    if (availableAfter) return res.status(400).send(`the given book is available after :${availableAfter}`);

    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const rent = await rentBook(req);

    res.send(rent);
}))

/**
 * Provides list of all rented books by a user
 */

router.get('/all-rented-books', auth, asyncMiddleware(async (req, res) => {
    const result = await rentedBooksByUser(req);
    res.send(result)
}))

/**
 * Gets total invest by a sepcifc user between start and end date
 */

router.get('/total-cost-between/', auth, asyncMiddleware(async (req, res) => {
    const estatement = await totalInvestment(req);
    res.send(estatement);
}))


module.exports = router;