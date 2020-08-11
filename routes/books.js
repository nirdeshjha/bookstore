const {
    Book,
    validate
} = require('../models/book');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const express = require('express');
const router = express.Router();


router.post('/insert-book', auth, async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let book = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publishingDate: req.body.publishingDate,
        ageAppropriationRange: req.body.ageAppropriationRange,
        numberOfCopies: req.body.numberOfCopies,
        rentalRate: req.body.rentalRate
    })
    book = await book.save();
    res.send(book);

})


router.get('/all-books', auth, async (req, res) => {
    if (req.query.number === 'true') {
        const books = await Book.count();
        res.send('books.length: ' + books);
    } else {
        const books = await Book.find();
        res.send(books);
    }
})


router.get('/', auth, async (req, res) => {
    if (req.query.genre !== undefined) {
        const result = await Book.find({
            genre: req.query.genre
        })
        if (result.length === 0) return res.status(404).send('No book is present with the given genre');
        else res.send(result);
    } else if (req.query.author !== undefined) {
        const result = await Book.find({
            author: req.query.author
        })
        if (result.length === 0) return res.status(404).send('No book is present with the given author');
        else res.send(result);
    } else if (req.query.title !== undefined) {
        const result = await Book.find({
            title: req.query.title
        })
        if (result.length === 0) return res.status(404).send('No book is present with the given title');
        else res.send(result);
    } else if (req.query.regexAuthor !== undefined) {
        const result = await Book.find({
            author: {
                $regex: req.query.regexAuthor
            }
        })
        if (result.length === 0) return res.status(404).send('No book is present with the given author');
        else res.send(result);
    }
})

router.put('/:id/', [auth, admin], async (req, res) => {
    const beforeResult = await Book.findById(req.params.id);
    if (beforeResult === null) return res.status(404).send('Books with given id is not found');


    if (req.query.changeAuthor !== undefined && req.query.changeAuthor.length < 3) return res.status(404).send('author should be more than 3 charecters');
    if (req.query.changeTitle !== undefined && req.query.changeTitle.length < 5) return res.status(404).send('title should be more than 5 charecters');


    if (req.query.changePrice !== undefined) {
        await Book.updateOne({
            _id: req.params.id
        }, {
            $set: {
                rentalRate: req.query.changePrice
            }
        })
    } else if (req.query.changeAuthor !== undefined) {
        await Book.updateOne({
            _id: req.params.id
        }, {
            $set: {
                author: req.query.changeAuthor
            }
        })
    } else if (req.query.changeTitle !== undefined) {
        await Book.updateOne({
            _id: req.params.id
        }, {
            $set: {
                title: req.query.changeTitle
            }
        })
    }
    res.send('succesfully updated');
})

router.delete('/:id', [auth, admin], async (req, res) => {
    const result = await Book.findById(req.params.id);
    if (result === null) return res.status(404).send('Books with given id is not found');

    await Book.deleteOne({
        _id: req.params.id
    })

    res.send('deleted successfully');
})

module.exports = router;