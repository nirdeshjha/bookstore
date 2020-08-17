const {
    Rented
} = require('../models/renters');
/**
 * 
 * @param {Object} req 
 * @returns {Array}
 */
async function listContainingBookId(req) {
    const result = await Rented.find({
        bookId: req.params.id
    })
    return result;
}

/**
 * 
 * @param {Object} req 
 * @returns {Array}
 */
async function listOfBookRentedByUser(req) {
    const result = await Rented.find({
        userId: req.user._id
    })
    return result;
}
module.exports.listContainingBookId = listContainingBookId;
module.exports.listOfBookRentedByUser = listOfBookRentedByUser;