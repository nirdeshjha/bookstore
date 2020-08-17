const {
    Book
} = require('../models/book');
/**
 * 
 * @param {Object} req 
 * @returns  {Object}
 */
async function listOfBookHavingBookId(req) {
    const book = await Book.findById(req.params.id);
    return book;
}

module.exports.listOfBookHavingBookId = listOfBookHavingBookId;