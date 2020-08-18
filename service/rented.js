const {
    Rented
} = require('../models/renters');
const {
    listContainingBookId,
    listOfBookRentedByUser
} = require('../data/rented');
const {
    listOfBookHavingBookId
} = require('../data/books');


class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = 400;
    }
}


/**
 * 
 * @param {Object} req 
 * @returns {string}
 */
async function checkForBookWithUser(req) {
    const result = await listContainingBookId(req);
    for (let i = 0; i < result.length; i++) {
        if (result[i].userId === req.user._id)
            throw new BadRequestError(`The book is already with you till ${result[i].returningDate}`);
    }
}


/**
 * 
 * @param {Object} req 
 * @returns {string}
 */
async function bookAvailableAfter(req) {
    const book = await listOfBookHavingBookId(req);
    const result = await listContainingBookId(req);
    if ((book.numberOfCopies - result.length) <= 0) {
        const returning = [];
        for (let i = 0; i < result.length; i++) {
            returning.push(result[i].returningDate);
        }
        const availableAfter = await returning.sort();
        throw new BadRequestError(`The given book is available after :${availableAfter[0]}`);
    }
}
/**
 * 
 * @param {Object} req 
 * @returns {Object}
 */
async function rentBook(req) {
    const rent = new Rented({
        userId: req.user._id,
        bookId: req.params.id,
        rentingDate: req.body.rentingDate,
        returningDate: req.body.returningDate,
        price: req.body.price
    })
    await rent.save();
    return rent;
}
/**
 * 
 * @param {Object} req 
 * @returns {Array}
 */
async function rentedBooksByUser(req) {
    const result = await listOfBookRentedByUser(req);
    return result;
}
/**
 * 
 * @param {Object} req 
 * @returns {Array}
 */
async function totalInvestment(req) {
    const result = await listOfBookRentedByUser(req);
    let start = -1,
        end;

    for (let i = 0; i < result.length; i++) {
        if (result[i].rentingDate >= req.query.fromDate)
            if (start === -1) start = i;
        if (result[i].rentingDate <= req.query.toDate) end = i;
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
    return estatement;
}

module.exports.checkForBookWithUser = checkForBookWithUser;
module.exports.bookAvailableAfter = bookAvailableAfter;
module.exports.rentBook = rentBook;
module.exports.totalInvestment = totalInvestment;
module.exports.rentedBooksByUser = rentedBooksByUser;