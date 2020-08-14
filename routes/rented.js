const {
    Book
} = require('../models/book');
//const User = require('../models/user');
const asyncMiddleware = require('../middlewares/async');
const auth = require('../middlewares/auth');
const {
    validate,
    Rented
} = require('../models/renters');
const express = require('express');
const router = express.Router();

/**
 * Upadtes the rented model when a book is rented by a user
 */
router.post('/:id/rentBook', auth, asyncMiddleware(async (req, res) => {
    const result = await Rented.find({
        bookId: req.params.id
    })

    let isWithme = false;
    for (let i = 0; i < result.length; i++) {
        if (result[i].userId === req.user._id) return res.status(400).send('The given book is already with you till ' + result[i].returningDate);
    }


    const book = await Book.findById(req.params.id);
    if ((book.numberOfCopies - result.length) <= 0) {
        const returning = [];
        for (let i = 0; i < result.length; i++) {
            returning.push(result[0].returningDate);
        }
        const availableAfter = await returning.sort();
        return res.status(400).send(`the given book is available after :${availableAfter[0]}`);
    }


    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const rent = new Rented({
        userId: req.user._id,
        bookId: req.params.id,
        rentingDate: req.body.rentingDate,
        returningDate: req.body.returningDate,
        price: req.body.price
    })
    await rent.save();
    res.send(rent);
}))

/**
 * Provides list of all rented books by a user
 */

router.get('/all-rented-books', auth, asyncMiddleware(async (req, res) => {

    const result = await Rented.find({
        userId: req.user._id
    })
    res.send(result)
}))

/**
 * Gets total invest by a sepcifc user between start and end date
 */
router.get('/total-cost-between/', auth, asyncMiddleware(async (req, res) => {
    const result = await Rented.find({
        userId: req.user._id
    })
    let start = -1,
        end;
    for (let i = 0; i < result.length; i++) {
        if (result[i].rentingDate === req.query.fromDate)
            if (start === -1) start = i;
        if (result[i].rentingDate === req.query.toDate) end = i;
    }
    const estatement = [];
    let totalCost = 0;
    for (let i = start; i <= end; i++) {
        let detailedInfo = {
            bookId: result[i].bookId,
            rentingDate: result[i].rentingDate,
            returningDate: result[i].returningDate,
            price: result[i].price
        }
        totalCost += detailedInfo.price;
        estatement.push(detailedInfo);
    }
    estatement.push({
        total: totalCost
    });
    res.send(estatement);
}))


module.exports = router;