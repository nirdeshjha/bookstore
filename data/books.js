const {
    Book
} = require('../models/book');

async function listOfBookHavingBookId(req) {
    const book = await Book.findById(req.params.id);
    return book;
}

module.exports.listOfBookHavingBookId = listOfBookHavingBookId;