const {
    Rented
} = require('../models/renters');

async function listContainingBookId(req) {
    const result = await Rented.find({
        bookId: req.params.id
    })
    return result;
}

async function listOfBookRentedByUser(req) {
    const result = await Rented.find({
        userId: req.user._id
    })
    return result;
}
module.exports.listContainingBookId = listContainingBookId;
module.exports.listOfBookRentedByUser = listOfBookRentedByUser;