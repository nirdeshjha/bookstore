const express = require('express');
const router = express.Router();

router.get('/all-books', (req, res) => {
    res.send({
        'name': 'nirdesh'
    });
})

router.get('/:id', (req, res) => {
    res.send({
        'id': (req.params.id),
        'title': 'Harry Potter',
        'author': 'J K Rowling'
    });
})


router.get('/', (req, res) => {
    if ((req.query.author != false && req.query.author === "J K Rowling") || (req.query.genre != false && req.query.genre === 'action') || (req.query.author != false && req.query.price === 10)) {
        res.send({
            'id': 1,
            'title': 'Harry Potter',
            'author': 'J K Rowling'
        });
    } else {
        return res.status(404).send('No book is availabe with author name ' + req.query.author);
    }
})



module.exports = router;